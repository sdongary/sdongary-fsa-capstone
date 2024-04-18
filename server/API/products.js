const express = require("express");

const { 
  fetchProducts,
  fetchSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../DB/products.js');

const { 
isAdmin, isLoggedIn
} = require ('../DB/auth.js')

// const express = require('express');
// const path = require('path');
// const app = express();
// app.use(express.json());

const router = express.Router();

//Fetch Products
router.get('/', async (req, res, next) => {
  try{
    res.send(await fetchProducts());
    } 
    catch(ex){
      next(ex);
    }
});

//Fetch Single Product
router.get('/:id', async (req, res, next) => {
  try {
    res.send(await fetchSingleProduct({id: req.params.id}));
  } catch (ex) {
    next(ex);
  }
});

//Create Product(isAdmin)
router.post('/', isAdmin, isLoggedIn, async(req, res, next)=> {
  try {
        res.status(201).send(await createProduct(req.body));
  }
  catch(ex){
    next(ex);
  }
});

// Update Product(isAdmin)
router.put('/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
  try {
       res.status(201).send(await updateProduct({...req.body, id: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
});

// Delete Product(isAdmin)
router.delete('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try{
    res.status(204).send(await deleteProduct({id:req.params.id}));
  } 
  catch(ex){
    next(ex);
  }
});

module.exports = router;