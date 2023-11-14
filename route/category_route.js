const category_route = require("express").Router();


const bodyparser = require("body-parser");
category_route.use(bodyparser.json());
category_route.use(bodyparser.urlencoded({ extended: true }));

const categoryController = require("../controller/category_controller");

category_route.post("/add-category", categoryController.addCategory);

module.exports = category_route;