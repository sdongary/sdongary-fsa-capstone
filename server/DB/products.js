const { client } = require('../client.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const createProduct = async ({ name, price, description, category, inventory, image }) => {
  const SQL = `
    INSERT INTO products(id, name, price, description, category, inventory, image) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), name, price, description, category, inventory, image]);
  console.log("CreatedProduct");
  return response.rows[0];
};

const fetchProducts = async () => {
  const SQL = `
  SELECT * FROM products;
  `;
  const response = await client.query(SQL);
  return response.rows;
}

const fetchSingleProduct = async ({ id }) => {
  const SQL = `
  SELECT * FROM products WHERE id=$1
  `;
  const result = await client.query(SQL, [id]);
  return result.rows[0];
};

const updateProduct = async ({ id, name, price, description, category, inventory}) => {
  const SQL = `
  UPDATE products
  SET name=$2, price=$3, description=$4, category=$5, inventory=$6
  WHERE id=$1
  RETURNING *
  `;
  const response = await client.query(SQL, [name, price, description, category, inventory, id]);
  return response.rows[0];
}

const deleteProduct = async ({ id }) => {
  const SQL = `
  DELETE FROM products WHERE id=$1
  `;
  await client.query(SQL, [id]);
}

module.exports = {
  createProduct,
  fetchProducts,
  fetchSingleProduct,
  updateProduct,
  deleteProduct
}