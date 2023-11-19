const subcategory_route = require("express").Router();


const bodyparser = require("body-parser");
subcategory_route.use(bodyparser.json());
subcategory_route.use(bodyparser.urlencoded({ extended: true }));

const subcategoryController = require("../controller/subcategory_controller");
const authtoken = require("../middleware/middleware");

subcategory_route.post("/add-subcategory",authtoken, subcategoryController.addSubcategory);
subcategory_route.get("/get-subcategory",authtoken, subcategoryController.getSubCategory);

module.exports = subcategory_route;