const Product = require("../model/product_model");
const categoryController = require("../controller/category_controller");
const subcategoryController = require("../controller/subcategory_controller");
const storeController = require("../controller/store_controller");

module.exports = {
    //ADD PRODUCT
    addProduct: async (req, res) => {
        try {

            // const images = req.files.filename;
            var arrImages = [];
            for (let i = 0; i < req.files.length; i++) {
                arrImages[i] = req.files[i].filename;
            }

            const product = new Product({
                vendor_id: req.body.vendor_id,
                store_id: req.body.store_id,
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discount,
                category_id: req.body.category_id,
                subcategory_id: req.body.subcategory_id,
                images: arrImages
            });

            const productData = await product.save();
            res.status(200).json({ success: true, msg: "Product Details", data: productData });

        } catch (error) {
            res.status(400).json(error.message);
        }
    },//ADD PRODUCT


    
    //GET PRODUCT
    getProduct: async (req, res) => {
        try {
            var send_data = [];
            var category_data = await categoryController.getCategoryes();
            
            if (category_data.length > 0) {
                for (let i = 0; i < category_data.length; i++) {
                    var product_data = [];
                    var cat_id = category_data[i]["_id"].toString();
                    var cat_product = await Product.find({ category_id: cat_id });



                    if (cat_product.length > 0) {
                        for (let j = 0; j < cat_product.length; j++) {
                            var store_data = await storeController.getStore(cat_product[j]["store_id"]);
                            product_data.push({
                                "product_id": cat_product[j]["_id"],
                                "vendor_id": cat_product[j]["vendor_id"],
                                "store_id": cat_product[j]["store_id"],
                                "name": cat_product[j]["name"],
                                "price": cat_product[j]["price"],
                                "discount": cat_product[j]["discount"],
                                "category_id": cat_product[j]["category_id"],
                                "subcategory_id": cat_product[j]["subcategory_id"],
                                "images": cat_product[j]["images"],
                                "store_address": store_data['address']
                            });
                        }
                    }



                    send_data.push({
                        "category": category_data[i]['category'],
                        "product": product_data
                    });

                }

                res.status(200).json({ success: true, msg: "Product Details", data: send_data });
            } else {
                res.status(200).json({ success: false, msg: "product details", data: send_data });
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }, //GET PRODUCT



    



    //SEARCH PRODUCT
    searchProduct: async (req, res) => {
        try {

            var search = req.body.search;
            var productData = await Product.find({ "name": { $regex: new RegExp(".*" + search + ".*", "i") } });

            if (productData.length > 0) {
                res.status(200).json({ success: false, msg: "Product Details.", data: productData });
            } else {
                res.status(200).json({ success: false, msg: "Product not Found!" });
            }

        } catch (error) {
            res.status(400).json(error.message);
        }
    },//SEARCH PRODUCT

    //PAGINATE PRODUCT PAGE OR SHORTED
    productPaginate: async (req, res) => {
        try {

            var page = req.body.page;
            var sort = req.body.sort;

            var product_data;
            var skip;

            if (page <= 1) {
                skip = 0;
            } else {
                skip = (page - 1) * 3;
            }

            if (sort) {
                var castomsort;
                if (sort == "name") {
                    castomsort = {
                        name: 1
                    }
                } else if (sort == "_id") {
                    castomsort = {
                        _id: 1
                    }
                }

                product_data = await Product.find().sort(castomsort).skip(skip).limit(3);
            } else {
                product_data = await Product.find().skip(skip).limit(3);
            }

            res.status(200).json({ success: true, msg: "Paginate Data", data: product_data });

        } catch (error) {
            res.status(400).json(error.message);
        }
    },//PAGINATE PRODUCT PAGE OR SHORTED


}