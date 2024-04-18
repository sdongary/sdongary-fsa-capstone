const express = require("express");
const {
    checkout
} =require ("../db/checkout.js")
const { isLoggedIn } = require("../db/auth.js")

const router = express.Router();

router.delete("/", isLoggedIn, async (req, res, next) => {
    try {
      res.status(204).send(await checkout(req.user.id))
    } catch (ex) {
      next(ex);
    }
  })

module.exports = router;