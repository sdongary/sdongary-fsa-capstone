const express = require("express");

const {
  createCart,
  addCartProduct,
  fetchCart,
  fetchCartedProducts,
  deleteCartProduct,
  deleteCartedProducts,
  increaseCartQuantity,
  decreaseCartQuantity

} = require('../DB/carts.js');

const { isLoggedIn } = require('../DB/auth.js');

const router = express.Router(); 


router.get('/', isLoggedIn, async(req, res, next)=> {
  try {
    const cartId = await fetchCart(req.user.id);
    if (!cartId) {
      const cart = await createCart({ user_id: req.user.id });
      res.send(cart);
    }
    res.send(cartId);
  } catch (ex) {
    next(ex);
  }
});

router.get("/cartItems", isLoggedIn, async (req, res, next) => {
  try {
    let cartId = await fetchCart(req.user.id);
    const cartProducts = await fetchCartedProducts(cartId.id);
    res.status(201).send(cartProducts);
  } catch (ex) {
    next(ex);
  }
});
// Add product to the cart
router.post('/cartItems', isLoggedIn, async (req, res, next) => {
  try {
    const cartId = await fetchCart(req.user.id);
    if (!cartId) {
      const cart = await createCart({ user_id: req.user.id });
      res.send(
        await addCartProduct({
          cart_id: cart.id,
          product_id: req.body.product_id,
          quantity: req.body.quantity,
        })
      );
    }
     } catch (ex) {
    next(ex);
  }
});

router.put("/cartItems/:cartItemsId", isLoggedIn, async (req, res, next) => {
  try {
    const cartId = await fetchCart(req.user.id);
        if (!cartId) {
      await createCart(req.user.id);
      cartId = await fetchCart(req.user.id);
    }
    res.send(
      await increaseCartQuantity({
        quantity: req.body.quantity,
        cart_id: cartId.id,
        product_id: req.params.cartItemsId
      })
    );
  } catch (ex) {
    next(ex);
  }
});


router.put("/cartItems/:cartItemsId", isLoggedIn, async (req, res, next) => {
  try {
    const cartId = await fetchCart(req.user.id);
    // if not cart exists create a new cart
    if (!cartId) {
      await createCart(req.user.id);
      cartId = await fetchCart(req.user.id);
    }
    res.send(
      await decreaseCartQuantity({
        quantity: req.body.quantity,
        cart_id: cartId.id,
        product_id: req.params.cartItemsId
      })
    );
  } catch (ex) {
    next(ex);
  }
});

//Fetch Cart (isLoggedIn)
// router.get('/', isLoggedIn , async(req, res, next)=> {
//   try{
//     res.send(await fetchCart(req.params.id));
//   }
//   catch(ex){
//     next(ex)
//   }
// });


// Create Carted Products
// router.post('/api/users/:cartId/cartedProducts', isLoggedIn, async (req, res, next) => {
//   try {
//     res.status(201).send(await createCartedProducts({ cart_id: req.params.cartId, product_id: req.body.product_id, quantity: req.body.quantity }));
//   }
//   catch (ex) {
//     next(ex);
//   }
// });

// Delete Carted Products
router.delete("/cartItems/:cartItemsId", isLoggedIn, async (req, res, next) => {
  try {
    const cartId = await fetchCart(req.user.id);
    await deleteCartProduct({
      cart_id: cartId.id,
      product_id: req.params.cartItemsId,
    });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

router.delete("/cartItems", isLoggedIn, async (req, res, next) => {
  try {
    const cartId = await seeCart(req.user.id);
    await deleteCartedProducts(cartId.id);
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
}
);

module.exports = router;