const express = require("express");

const { 
  fetchCategories,
  fetchCategorizedProducts,
  createCategory,
} = require('../DB/products.js');

const { 
  isAdmin, isLoggedIn
  } = require ('../DB/auth.js')

  const router = express.Router();

  //Fetch Categories
router.get('/', async (req, res, next) => {
  try{
    res.send(await fetchCategories())
  } catch (ex) {
    next(ex);
  }
})

//Fetch Categorized Products
router.get('/:categoryName', async (req, res, next) => {
  try{
    res.send(await fetchCategorizedProducts(req.param.categoryName))
  } catch (ex) {
    next(ex);
  }
})

//Create Category(isAdmin)
router.post('/', isAdmin, isLoggedIn, async(req, res, next)=> {
  try {
        res.status(201).send(await createCategory(req.body));
  }
  catch(ex){
    next(ex);
  }
});

module.exports = router;
