const addtocart_route = require("express").Router();

const bodyparser = require("body-parser");
addtocart_route.use(bodyparser.json());
addtocart_route.use(bodyparser.urlencoded({ extended: true }));

const verifyToken = require("../middleware/middleware");

const addtocartController = require("../controller/addtocart_controllr");

addtocart_route.post("/add-to-cart",verifyToken, addtocartController.addtocart); 
addtocart_route.get("/get-cart",verifyToken,addtocartController.getCartData);

module.exports = addtocart_route;