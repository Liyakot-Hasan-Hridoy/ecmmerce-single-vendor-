const bye_product_route = require("express").Router();

const bodyparsar = require("body-parser");
bye_product_route.use(bodyparsar.json());
bye_product_route.use(bodyparsar.urlencoded({ extended: true }));

const byeProductController = require("../controller/bye_product_controller");
const authtoken = require("../middleware/middleware");


bye_product_route.post("/bye-product",authtoken, byeProductController.byeProduct);



module.exports = bye_product_route;
