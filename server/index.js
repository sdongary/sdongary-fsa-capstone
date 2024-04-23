const express = require('express');

const { client } = require('./client.js');

const {createTables, seedTable} = require('./DB/seed.js');

const cors = require('cors');

const app = express();
app.use(express.json());

const usersRouter = require('./API/users.js');
const productsRouter = require('./API/products.js');
const cartsRouter = require('./API/carts.js');
const checkoutRouter = require('./API/checkout.js');
const categoryRouter = require("./API/categories.js");


//for deployment only
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html')));

app.use('/api/assets', express.static(path.join(__dirname, 'assets'))); 




app.use(cors());
app.use('/api/auth', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/mycart', cartsRouter);
app.use('/api/checkout', checkoutRouter);
app.use("/api/categories", categoryRouter);

app.all('*', (req, res) => {
  return res.status(404).json({ error: '404 Not Found' })
})

const init = async()=> {
  
  await client.connect();
  console.log('connected to database');

  await createTables();
  console.log('tables created');

  await seedTable();
  console.log('data seeded');

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init();

