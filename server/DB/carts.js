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

//Add Product to the cart
const addCartProduct = async ({ cart_id, product_id, quantity }) => {
  const SQL = `
    INSERT INTO carted_products(id, cart_id, product_id, quantity) VALUES($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), cart_id, product_id, quantity]);
  return response.rows[0];
};

// Fetch products that are in the cart(User LoggedIn)
const fetchCartedProducts = async ({ cart_id }) => {
  const SQL = `
  SELECT produscts.id, products.name, products.price, carted_products.quantity FROM carted_products
  INNER JOIN products
  ON products.id = carted_products.product_id
  WHERE carted_products.cart_id = $1
  `;
  const response = await client.query(SQL, [cart_id]);
  return response.rows;
}
//Delete Products from the cart
const deleteCartProduct = async ({ cart_id, product_id }) => {
  const SQL = `
  DELETE FROM carted_products 
  WHERE cart_id=$1 AND product_id=$2
  RETURNING *
  `;
  await client.query(SQL, [cart_id, product_id]);
}

// Update existing products in the cart
const updateAddCartProduct = async ({ cart_id, product_id, quantity }) => {
  const SQL = `
  UPDATE carted_products
  SET product_id=$2 AND cart_id=$3, quantity=$4
  WHERE id=$1
  RETURNING *
  `;
  const response = await client.query(SQL, [cart_id, product_id, quantity]);
  return response.rows[0];
}
//Delete all products from cart upon checkout
const deleteCartedProducts = async ({ cart_id }) => {
  const SQL = `
  DELETE FROM carted_products WHERE cart_id=$1
  `;
  await client.query(SQL, [cart_id]);
}

const fetchCarts = async () => {
  const SQL = `
  SELECT * 
  FROM carts
  `;
  const response = await client.query(SQL);
  return response.rows;
}

module.exports = {
  createCart,
  addCartProduct,
  fetchCart,
  fetchCartedProducts,
  updateAddCartProduct,
  deleteCartProduct,
  deleteCartedProducts,
  fetchCarts
}