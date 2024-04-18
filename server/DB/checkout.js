const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkout = async (cart_id) => {
  const SQL = `
  DELETE FROM carted_products WHERE cart_id=$1
  `;
  await client.query(SQL, [cart_id]);
};

module.exports = {
  checkout
  }