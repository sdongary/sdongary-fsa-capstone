const { client } = require('../client.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const JWT = process.env.JWT || 'shhh';

const createUser = async ({ username, email, password, address, payment_type, is_admin }) => {
  const SQL = `
    INSERT INTO users(id, username, email, password, address, payment_type, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), username, email, await bcrypt.hash(password, 5), address, payment_type, is_admin]);
  console.log("Create User");
  return response.rows[0];
};

const fetchUser = async (id) => {
  const SQL = `
  SELECT id, username, email, password, adresss, payment_type, is_admin FROM users
  WHERE id=$1
  `;
  const response = await client.query(SQL,[id]);
  return response.rows;
};

const updateUser = async ({  username, email, password, address, payment_type, is_admin }) => {
  const SQL = `
  UPDATE users
  SET username=$2, email=$3, password=$4, address=$5, payment_type=$6, is_admin=$7
  WHERE id=$1
  RETURNING *
  `
  const response = await client.query(SQL, [ username, email, password, address, payment_type, is_admin]);
  return response.rows[0];
};

const deleteUser = async ({ id }) => {
  const SQL = `
  DELETE FROM users WHERE id=$1
  `;
  await client.query(SQL, [id]);
};

module.exports = {
  createUser,
  fetchUser,
  updateUser,
  deleteUser
};