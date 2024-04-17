const { client } = require('../client.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const createCart = async ({ user_id }) => {
  const SQL = `
    INSERT INTO carts(id, user_id) VALUES($1, $2) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), user_id]);
  return response.rows[0];
};

const fetchCart = async ({ userId }) => {
  const SQL = `
  SELECT * FROM carts WHERE user_id = $1;
  `;
  const response = await client.query(SQL, [userId]);
  return response.rows;
};

const createCartedProducts = async ({ cart_id, product_id, quantity }) => {
  const SQL = `
    INSERT INTO carted_products(id, cart_id, product_id, quantity) VALUES($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), cart_id, product_id, quantity]);
  return response.rows[0];
};

// Changes
const fetchCartedProducts = async ({ cart_id }) => {
  const SQL = `
  SELECT * FROM carted_products WHERE cart_id = $1;
  `;
  const response = await client.query(SQL, [cart_id]);
  return response.rows;
}

// Changes
const updateCartedProducts = async ({ id, cart_id, product_id, quantity }) => {
  const SQL = `
  UPDATE carted_products
  SET product_id=$2 AND cart_id=$3, quantity=$4
  WHERE id=$1
  RETURNING *
  `;
  const response = await client.query(SQL, [cart_id, product_id, quantity]);
  return response.rows[0];
}

const deleteCartedProduct = async ({ id }) => {
  const SQL = `
  DELETE FROM carted_products WHERE id=$1
  `;
  await client.query(SQL, [id]);
}

modulw.exports = {
  createCart,
  createCartedProducts,
  fetchCart,
  fetchCartedProducts,
  updateCartedProducts,
  deleteCartedProduct
}