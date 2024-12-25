const express = require('express');
const Router = express.Router();

Router.get("/", (req, res) => {
   return res.render("home")
})

module.exports = Router;