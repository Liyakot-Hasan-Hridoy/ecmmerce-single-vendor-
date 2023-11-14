const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const auth_router = require("./route/auth_route");// USER ROUTER
const store_router = require("./route/store_route");// STORE ROUTER
const category_router = require("./route/category_route");//CATEGORY ROUTER
const subcategory_router = require("./route/subcategory_route");//SUBCATEGORY ROUTER
const product_router = require("./route/product_route");//PRODUCT ROUTER
const count_router = require("./route/common _route");//COUNT ROUTER
const addtocart_router = require("./route/addtocart_route");//ADD TO CART ROUTER
const address_router = require("./route/address_route");// ADDRESS ROUTER
const bye_product_router = require("./route/bye_product_route");//BYE PRODUCT ROUTER



dotenv.config();

mongoose.connect(process.env.MONGODBCONNECT).then(() => {
    console.log("MONGODB CONNECTED");
});



app.use(express.json());
app.use("/api", auth_router);//AUTH API
app.use("/api", store_router);//STORE API
app.use("/api", category_router);//CATEGORY ROUTER
app.use("/api", subcategory_router);//SUBCATEGORY ROUTER
app.use("/api", product_router);//PRODUCT ROUTER
app.use("/api", count_router);//COUNT ROUTER 
app.use("/api", addtocart_router);//ADD TO CART ROUTE
app.use("/api", address_router);//ADDRESS ROUTER
app.use("/api", bye_product_router);//BYE PRODUCT ROUTER



app.listen(process.env.PORT, () => {
    console.log("SERVER PORT CONNECTED");
});



