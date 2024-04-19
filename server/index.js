
// const express = require('express');
// const { register } = require('module');
// 

const { client } = require('./client.js');
const {fakeData} = require('./DB/data.js');
const {createTables} = require('./DB/seed.js');

const cors = require('cors');

const app = express();
app.use(express.json());

const usersRouter = require('./API/users.js');
const productsRouter = require('./API/products.js');
const cartsRouter = require('./API/carts.js');
const checkoutRouter = require('./API/checkout.js')


//for deployment only
const path = require('path');
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets'))); 


// app.use((err, req, res, next)=> {
//   console.log(err);
//   res.status(err.status || 500).send({ error: err.message ? err.message : err });
// });

app.use(cors());
app.use('/API/users, usersRouter');
app.use('/API/products, productssRouter');
app.use('/API/cart, cartsRouter');
app.use('/API/checkout, checkoutRouter');

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

