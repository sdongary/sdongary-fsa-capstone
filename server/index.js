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
} = require('./db');
const express = require('express');
const { register } = require('module');
const {fakeData} = require('./data');
const path = require('path');
const app = express();
app.use(express.json());


//for deployment only

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets'))); 

const isLoggedIn = async(req, res, next)=> {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  }
  catch(ex){
    next(ex);
  }
};

const isAdmin = async(req, res, next)=> {
  try {
      if(!req.user.is_admin){
        res.status(401).send("Error");
      }
    next();
  }
  catch(ex){
    next(ex);
  }
};

//Login
app.post('/api/auth/login', async(req, res, next)=> {
  try {
    res.send(await authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/auth/register', async(req, res, next)=> {
  try {
    res.send(await createUser(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//Register
app.get('/api/auth/me', isLoggedIn, async(req, res, next)=> {
  try {
   res.send(await findUserWithToken(req.headers.authorization));   
  }
  catch(ex){
    next(ex);
  }
});

//Fetch User Info
app.get('/api/users',isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchUsers());
  }
  catch(ex){
    next(ex);
  }
});

//Fetch Products
app.get('/api/products', async (req, res, next) => {
  try{
    res.send(await fetchProducts());
    } 
    catch(ex){
      next(ex);
    }
});

//Fetch Carted Products
app.get('/api/users/:userId/cartedProducts', async(req, res, next)=> {
  try {
       res.send(await fetchCartedProducts(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

//Fetch Single Product
app.get('/api/product/:id', async (req, res, next) => {
  try {
    res.send(await fetchSingleProduct({id: req.params.id}));
  } catch (ex) {
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

//Create Product(isAdmin)
app.post('/api/products', isAdmin, isLoggedIn, async(req, res, next)=> {
  try {
        res.status(201).send(await createProduct(req.body));
  }
  catch(ex){
    next(ex);
  }
});

// Update Product(isAdmin)
app.put('/api/product/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
  try {
       res.status(201).send(await updateProduct({...req.body, id: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
});

// Updata User
app.put('/api/user/:id', isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await updateUser({...req.body, id: req.params.id}));
  } catch (ex) {
    next(ex);
  }
});

// Update Carted Products
app.put('/api/user/:userId/product/:id/cartedProducts', isLoggedIn, async (req, res, next) => {
  try{
    res.status(201).send(await updateCartedProducts({quantity: req.body.quantity, user_id:req.params.userId, product_id:req.params.product_id}));
  } 
  catch(ex){
    next(ex);
  }
});

// Delete User
app.delete('/api/user/:id', isLoggedIn, async (req, res, next) => {
  try {
    res.status(204).send(await deleteUser({id: req.params.id}));
  } catch (ex) {
    next(ex);
  }
});

// Delete Product(isAdmin)
app.delete('/api/products/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try{
    res.status(204).send(await deleteProduct({id:req.params.id}));
  } 
  catch(ex){
    next(ex);
  }
});

// Create Carted Products
app.post('/api/users/:userId/cartedProducts', isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await createCartedProducts({ user_id: req.params.userId, product_id: req.body.product_id, quantity: req.body.quantity }));
  }
  catch (ex) {
    next(ex);
  }
});

// Delete Carted Products
app.delete('/api/users/:userId/product/:id/cartedProduct/', isLoggedIn, async (req, res, next) => {
  try {
    await deleteCartedProduct({ user_id: req.params.userId, product_id: req.params.id });
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

