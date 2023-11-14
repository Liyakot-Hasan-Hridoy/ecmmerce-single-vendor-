const address_route = require("express").Router();

const bodyparser = require("body-parser");

address_route.use(bodyparser.json());
address_route.use(bodyparser.urlencoded({ extended:true }));
const addressController = require("../controller/address_controller");
const authtoken = require("../middleware/middleware");

address_route.post("/add-address",authtoken, addressController.mul_address);



module.exports = address_route;