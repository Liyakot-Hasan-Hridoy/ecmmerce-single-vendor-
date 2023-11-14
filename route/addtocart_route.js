const addtocart_route = require("express").Router();

const bodyparser = require("body-parser");
addtocart_route.use(bodyparser.json());
addtocart_route.use(bodyparser.urlencoded({ extended: true }));

const addtocartController = require("../controller/addtocart_controllr");

addtocart_route.post("/add-to-cart", addtocartController.addtocart);

module.exports = addtocart_route;