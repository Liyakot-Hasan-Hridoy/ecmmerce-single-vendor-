const AddtoCart = require("../model/addtocart_model");
const jwt = require('jsonwebtoken');

module.exports = {
    addtocart: async (req, res) => {
        try {
            // Extract product information from the request body
            const { product_id, price, vendor_id, store_id } = req.body;

            // Get the user ID from the decoded token
            const userId = req.user.userId;

            // Log the user ID for debugging
            console.log('User ID:', userId);

            // Create a new AddtoCart instance with the associated user ID
            const addToCart = new AddtoCart({
                product_id: product_id,
                price: price,
                vendor_id: vendor_id,
                store_id: store_id,
                userId: userId,
            });

            // Save the cart data to the database
            const addtocart_DAta = await addToCart.save();

            // Respond with success message and the saved cart data
            res.status(200).json({ success: true, msg: "Product added to the cart", data: addtocart_DAta });
        } catch (error) {
            // Handle errors by sending a failure response
            res.status(400).json({ success: false, msg: error.message });
        }
    },

    getCartData: async (req, res) => {
        try {
            // Get the user ID from the decoded token
            const userId = req.user.userId;

            // Log the user ID for debugging
            console.log('User ID for getCartData:', userId);

            // Retrieve cart data for the specific user
            const cartData = await AddtoCart.find({ userId: userId });

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
