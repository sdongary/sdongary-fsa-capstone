const express = require("express");

const {
  createCart,
  addCartProduct,
  fetchCart,
  fetchCartedProducts,
  updateAddCartProduct,
  deleteCartProduct,
  deleteCartedProducts,
  fetchCarts

} = require('../DB/carts.js');

const { isLoggedIn } = require('../DB.auth.js');

// const express = require('express');
// const path = require('path');
// const app = express();
// app.use(express.json());

const router = express.Router(); 

//Fetch Carted Products
router.get('/api/users/:cartId/cartedProducts', async(req, res, next)=> {
  try {
       res.send(await fetchCartedProducts(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

//Fetch Cart (LoggedIn user)
router.get('/', isLoggedIn , async(req, res, next)=> {
  try{
    res.send(await fetchCart(req.params.id));
  }
  catch(ex){
    next(ex)
  }
});

//Fetch All Carted Products(isAdmin)
// router.get('/api/cartedProducts', isAdmin, isLoggedIn, async (req, res, next) => {
//   try {
//     res.send(await fetchAllCartedProducts());
//   }
//   catch (ex) {
//     next(ex);
//   }
// });

// Update Carted Products
router.put('/api/user/:cartId/product/:id/cartedProducts', isLoggedIn, async (req, res, next) => {
  try{
    res.status(201).send(await updateCartedProducts({quantity: req.body.quantity, cart_id:req.params.cartId, product_id:req.params.product_id}));
  } 
  catch(ex){
    next(ex);
  }
});

// Create Carted Products
router.post('/api/users/:cartId/cartedProducts', isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await createCartedProducts({ cart_id: req.params.cartId, product_id: req.body.product_id, quantity: req.body.quantity }));
  }
  catch (ex) {
    next(ex);
  }
});

// Delete Carted Products
router.delete('/:productid', isLoggedIn, async (req, res, next) => {
  try {
    await deleteCartedProduct({ cart_id: req.params.cartId, product_id: req.params.id });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});