const { client } = require('../client.js')

const createTables = async () => {
  const SQL = `
  DROP TABLE IF EXISTS carted_products;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS carts;  
  DROP TABLE IF EXISTS users;
  

  CREATE TABLE users(
    id UUID DEFAULT gen_random_uuid(),
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    payment_type VARCHAR(16),
    is_admin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
  );
  CREATE TABLE products(
    id UUID DEFAULT gen_random_uuid(),
    name VARCHAR(200) UNIQUE NOT NULL,
    inventory INTEGER DEFAULT 0,
    price NUMERIC NOT NULL,
    description VARCHAR(255),
    category VARCHAR(25),
    image VARCHAR(255),
    PRIMARY KEY (id)
  );  
  CREATE TABLE carts(
    id UUID DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    PRIMARY KEY (id)
  );
  CREATE TABLE carted_products(
    id UUID DEFAULT gen_random_uuid(), 
    cart_id UUID REFERENCES carts(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    quantity INTEGER DEFAULT 0,
    CONSTRAINT unique_cart_id_and_product_id UNIQUE (cart_id, product_id),
    PRIMARY KEY(id)
    );    
  `;
  await client.query(SQL);
};

// const fetchAllCartedProducts = async () => {
//   const SQL = `
//     SELECT * FROM carted_products
//   `;
//   const result = await client.query(SQL);
//   return result.rows;
// };

module.exports = {
  createTables  
};
