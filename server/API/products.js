const { 
  fetchProducts,
  fetchSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./DB/seed');

const { 
isAdmin, isLoggedIn
} = require ('./DB/auth.ja')

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());





//Fetch Products
app.get('/api/products', async (req, res, next) => {
  try{
    res.send(await fetchProducts());
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

// Delete Product(isAdmin)
app.delete('/api/products/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try{
    res.status(204).send(await deleteProduct({id:req.params.id}));
  } 
  catch(ex){
    next(ex);
  }
});