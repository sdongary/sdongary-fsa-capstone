const { 
  createUser,   
  fetchUsers, 
  updateUser, 
  deleteUser
 } = require('./DB.seed.js');
  
const {
  isLoggedIn, 
  findUserWithToken, 
  authenticate } = require('./DB/auth.js');

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

//Login
app.post('/api/auth/login', async(req, res, next)=> {
  try {
    res.send(await authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//Register
app.post('/api/auth/register', async(req, res, next)=> {
  try {
    res.send(await createUser(req.body));
  }
  catch(ex){
    next(ex);
  }
});

// isLoggedIn
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

// Update User
app.put('/api/user/:id', isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await updateUser({...req.body, id: req.params.id}));
  } catch (ex) {
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