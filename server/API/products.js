const express = require("express");

const { 
  fetchProducts,
  fetchSingleProduct,
  fetchCategories,
  fetchCategorizedProducts,
  createProduct,
  createCategory,
  updateProduct,
  deleteProduct
} = require('../DB/products.js');

const { 
isAdmin, isLoggedIn
} = require ('../DB/auth.js')

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
router.get('/:productId', async (req, res, next) => {
  try {
    res.send(await fetchSingleProduct( req.params.productId));
  } catch (ex) {
    next(ex);
  }
});

//Create Product(isAdmin)
router.post('/', isAdmin, isLoggedIn, async(req, res, next)=> {
  try {
    res.status(201).send(
      await createProduct({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        inventory: req.body.inventory,
        prod_catergory: req.body.prod_catergory,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

// Update Product(isAdmin)
router.put('/:productId', isLoggedIn, isAdmin, async(req, res, next)=> {
  try {
    res.status(201).send(
      await updateProduct({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        inventory: req.body.inventory,
        prod_catergory: req.body.prod_catergory,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

// Delete Product(isAdmin)
router.delete('/:productId', isLoggedIn, isAdmin, async (req, res, next) => {
  try{
    res.status(204).send(await deleteProduct(req.params.productId));
  } 
  catch(ex){
    next(ex);
  }
});

module.exports = router;