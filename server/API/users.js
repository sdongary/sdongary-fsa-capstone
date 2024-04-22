const express = require("express");

const { 
  createUser,   
  fetchUser, 
  updateUser, 
  deleteUser,
  fetchAllUsers
 } = require('../DB/users.js');
  
const {
  isLoggedIn, 
  isAdmin,
  findUserWithToken, 
  authenticate } = require('../DB/auth.js');

const router = express.Router();

//Register
router.post('/register', async(req, res, next)=> {
  try {
    res.send(await createUser(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//Login
router.post('/login', async(req, res, next)=> {
  try {
    res.send(await authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

router.get("/me", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});


//Fetch User 
router.get('/myaccount',isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchUser());
  }
  catch(ex){
    next(ex);
  }
});

// Update User
router.put('/myaccount', isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await updateUser({
      username: req.body.username,
      address: req.body.address,
      id: req.user.id
    }));
  } catch (ex) {
    next(ex);
  }
});

// Delete User
router.delete('/myaccount', isLoggedIn, async (req, res, next) => {
  try {
    res.status(204).send(await deleteUser(req.user.id));
  } catch (ex) {
    next(ex);
  }
});

router.get('/admin/users', isLoggedIn, isAdmin, async (req, res, next) => {
  try{
    res.send(await fetchAllUsers());
  } catch (ex){
    next(ex);
  }
}); 

module.exports = router;