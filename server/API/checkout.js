const express = require("express");
const {
    checkout
} =require ("../DB/checkout.js")
const { isLoggedIn } = require("../DB/auth.js")

const router = express.Router();

router.delete("/", isLoggedIn, async (req, res, next) => {
    try {
      res.status(204).send(await checkout(req.cart.id))
    } catch (ex) {
      next(ex);
    }
  })

module.exports = router;