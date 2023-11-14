const count_route = require("express").Router();

const bodyparser = require("body-parser");
count_route.use(bodyparser.json());
count_route.use(bodyparser.urlencoded({extended:true}));

const countController = require("../controller/common_controller");
const authtoken = require("../middleware/middleware");

count_route.get("/data-count",authtoken, countController.dataCount);

module.exports = count_route;