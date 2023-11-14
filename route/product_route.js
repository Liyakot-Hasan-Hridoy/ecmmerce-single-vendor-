const Product_route = require("express").Router();


const bodyparser = require("body-parser");
Product_route.use(bodyparser.json());
Product_route.use(bodyparser.urlencoded({ extended: true }));

const productController = require("../controller/product_controller");

const multer = require("multer");
const path = require("path");


// IMAGE VALIDATION
const stroege = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "public/productImage");
    },

    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalide file type"), false);
    }
};

const upload = multer({
    storage: stroege,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});// IMAGE VALIDATION



Product_route.post("/add-product", upload.array("images"),productController.addProduct);
Product_route.get("/get-product", productController.getProduct);
Product_route.get("/search-product", productController.searchProduct);
Product_route.post("/paginate", productController.productPaginate);

module.exports = Product_route;