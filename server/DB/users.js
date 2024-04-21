const { client } = require('../client.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';

const createUser = async ({ email, password, username, address, payment_type, is_admin }) => {
  const SQL = `
    INSERT INTO users(id, email, password, username, address, payment_type, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), email, await bcrypt.hash(password, 5), username, address, payment_type, is_admin]);
  return response.rows[0];
};

const fetchUser = async (id) => {
  const SQL = `
  SELECT id, email, adresss, payment_type, is_admin FROM users
  WHERE id=$1
  `;
  const response = await client.query(SQL,[id]);
  return response.rows[0];
};

const updateUser = async ({  username, email, password, address, payment_type, is_admin }) => {
  const SQL = `
  UPDATE users
  SET username=$1, email=$2, password=$3, address=$4, payment_type=$5, is_admin=$6
  WHERE id=$7
  RETURNING *
  `
  const response = await client.query(SQL, [ username, email, password, address, payment_type, is_admin]);
  return response.rows[0];
};

const deleteUser = async ( id ) => {
  const SQL = `
  DELETE FROM users WHERE id=$1
  `;
  await client.query(SQL, [id]);
};

const fetchAllUsers = async () => {
  const SQL = `
  SELECT id, email, username, address, payment_type, is_admin FROM users
  `;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = {
  createUser,
  fetchUser,
  updateUser,
  deleteUser,
  fetchAllUsers
};