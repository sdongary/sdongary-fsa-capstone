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







//Fetch Carted Products
app.get('/api/users/:userId/cartedProducts', async(req, res, next)=> {
  try {
       res.send(await fetchCartedProducts(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});



//Fetch All Carted Products(isAdmin)
app.get('/api/cartedProducts', isAdmin, isLoggedIn, async (req, res, next) => {
  try {
    res.send(await fetchAllCartedProducts());
  }
  catch (ex) {
    next(ex);
  }
});







// Update Carted Products
app.put('/api/user/:cartId/product/:id/cartedProducts', isLoggedIn, async (req, res, next) => {
  try{
    res.status(201).send(await updateCartedProducts({quantity: req.body.quantity, cart_id:req.params.cartId, product_id:req.params.product_id}));
  } 
  catch(ex){
    next(ex);
  }
});





// Create Carted Products
app.post('/api/users/:cartId/cartedProducts', isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await createCartedProducts({ cart_id: req.params.cartId, product_id: req.body.product_id, quantity: req.body.quantity }));
  }
  catch (ex) {
    next(ex);
  }
});

// Delete Carted Products
app.delete('/api/users/:cartId/product/:id/cartedProduct/', isLoggedIn, async (req, res, next) => {
  try {
    await deleteCartedProduct({ cart_id: req.params.cartId, product_id: req.params.id });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});


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

