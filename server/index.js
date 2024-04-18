const {
  client,
  createTables,
  createUser,
  createProduct,
  createCartedProducts,
  updateUser,
  updateProduct,
  updateCartedProducts,
  deleteUser,
  deleteProduct,
  deleteCartedProduct,
  fetchUsers,
  fetchProducts,
  fetchCartedProducts,
  fetchSingleProduct,
  fetchAllCartedProducts,
  authenticate,
  findUserWithToken
} = require('./DB/seed');
const express = require('express');
const { register } = require('module');
const {fakeData} = require('./DB/data');
const path = require('path');
const app = express();
app.use(express.json());


//for deployment only

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets'))); 


app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message ? err.message : err });
});

const init = async()=> {
  const port = process.env.PORT || 3000;
  await client.connect();
  console.log('connected to database');

  await createTables();
  console.log('tables created');

 await fakeData();

  app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init();

