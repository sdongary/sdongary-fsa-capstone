const express = require("express");

const { 
  createUser,   
  fetchUser, 
  updateUser, 
  deleteUser
 } = require('../DB/users.js');
  
const {
  isLoggedIn, 
  findUserWithToken, 
  authenticate } = require('../DB/auth.js');

// const express = require('express');
// const path = require('path');
// const app = express();
// app.use(express.json());

const router = express.Router();

//Login
router.post('/login', async(req, res, next)=> {
  try {
    res.send(await authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//Register
router.post('/register', async(req, res, next)=> {
  try {
    res.send(await createUser(req.body));
  }
  catch(ex){
    next(ex);
  }
});

// isLoggedIn
router.get('/me', isLoggedIn, async(req, res, next)=> {
  try {
   res.send(await findUserWithToken(req.headers.authorization));   
  }
  catch(ex){
    next(ex);
  }
});

//Fetch User 
router.get('/',isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchUser());
  }
  catch(ex){
    next(ex);
  }
});

// Update User
router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await updateUser({...req.body, id: req.params.id}));
  } catch (ex) {
    next(ex);
  }
});

// Delete User
router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    res.status(204).send(await deleteUser({id: req.params.id}));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;