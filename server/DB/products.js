const { client } = require('../client.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//All Categories

const fetchCategories = async () => {
  const SQL =`
  SELECT * FROM categories
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchCategorizedProducts = async (prod_category) => {
  const SQL = `
      SELECT *
      FROM products
      WHERE prod_category=$1
    `;
  const response = await client.query(SQL, [prod_category]);
  return response.rows;
};

const fetchProducts = async () => {
  const SQL = `
  SELECT * FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
}

const fetchSingleProduct = async ( id ) => {
  const SQL = `
  SELECT * FROM products WHERE id=$1
  `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const createCategory = async ({ name }) => {
  const SQL =`
  INSERT INTO categories(id, name) VALUES($1, $2) RETURNING *
  `
  const response = await client.query(SQL, [uuid.v4(), name]);
};

const createProduct = async ({ name, price, description, prod_category, inventory, image }) => {
  const SQL = `
    INSERT INTO products(id, name, price, description, prod_category, inventory, image) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), name, price, description, prod_category, inventory, image]);
  return response.rows[0];
};

const updateProduct = async ({ name, price, description, prod_category, inventory, image}) => {
  const SQL = `
  UPDATE products
  SET name=$1, price=$2, description=$3, prod_category=$4, inventory=$5, image=$6
  WHERE id=$7
  RETURNING *
  `;
  const response = await client.query(SQL, [{name, price, description, prod_category, inventory, image}]);
  return response.rows[0];
}

const deleteProduct = async (id) => {
  const SQL = `
  DELETE FROM products WHERE id=$1
  `;
  await client.query(SQL, [id]);
}

module.exports = {
  fetchCategories,
  fetchCategorizedProducts,
  fetchProducts,
  fetchSingleProduct,
  createCategory,
  createProduct,
  updateProduct,
  deleteProduct
}