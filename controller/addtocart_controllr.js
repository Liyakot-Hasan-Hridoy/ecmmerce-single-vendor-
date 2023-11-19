const AddtoCart = require("../model/addtocart_model");
const Product = require("../model/product_model");
const jwt = require('jsonwebtoken');

module.exports = {
    addtocart: async (req, res) => {
        try {
            const { product_id } = req.body;

            const userId = req.user._id;

            console.log('User ID:', userId);

            const addToCart = new AddtoCart({
                product_id: product_id,
                user_id: userId,
            });

            const addtocart_DAta = await addToCart.save();

            res.status(200).json({ success: true, msg: "Product added to the cart", data: addtocart_DAta });
        } catch (error) {
            res.status(400).json({ success: false, msg: error.message });
        }
    },

    getCartData: async (req, res) => {
        try {
            const userId = req.user._id;

            // console.log('User ID for getCartData:', userId);

            const cartData = await AddtoCart.find({ user_id: userId }) 
            .populate({
                path: 'product_id',
                model: 'Product', 
                select: 'vendor_id store_id name price discount category_id subcategory_id images',
            });

            res.status(200).json({ success: true, msg: "User's Cart Data", data: cartData });
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                res.status(401).json({ success: false, msg: 'Unauthorized: Invalid token' });
            } else {
                res.status(500).json({ success: false, msg: 'Internal Server Error', error: error.message });
            }
        }
    },
};
