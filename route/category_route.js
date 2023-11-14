const category_route = require("express").Router();


const bodyparser = require("body-parser");
category_route.use(bodyparser.json());
category_route.use(bodyparser.urlencoded({ extended: true }));

const categoryController = require("../controller/category_controller");
const authtoken = require("../middleware/middleware");

category_route.post("/add-category",authtoken, categoryController.addCategory);

module.exports = category_route;