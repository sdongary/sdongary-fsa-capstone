const { client } = require('../client.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const JWT = process.env.JWT || 'shhh';

const authenticate = async ({ email, password }) => {
  const SQL = `
    SELECT id, password, email 
    FROM users WHERE 
    email=$1;
  `;

  const response = await client.query(SQL, [email]);
  if (!response.rows.length || (await bcrypt.compare(password, response.rows[0].password)) === false) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id }, JWT);
  return { token: token };
};

const findUserWithToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  }
  catch (ex) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, email, is_admin FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};


const isLoggedIn = async(req, res, next)=> {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  }
  catch(ex){
    next(ex);
  }
};

const isAdmin = async(req, res, next)=> {
  try {
      if(!req.user.is_admin){
        res.status(401).send("Error");
      }
    next();
  }
  catch(ex){
    next(ex);
  }
};

module.exports = {
  client,
  authenticate,
  findUserWithToken,
  isAdmin,
  isLoggedIn
}