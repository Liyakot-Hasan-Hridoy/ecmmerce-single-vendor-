const AddtoCart = require("../model/addtocart_model");

module.exports = {

    //ADD TO CART 
    addtocart: async (req, res) => {
        try {

            const addToCart = new AddtoCart({
                product_id: req.body.product_id,
                price: req.body.price,
                vendor_id: req.body.vendor_id,
                store_id: req.body.store_id
            });

            const addtocart_DAta = await addToCart.save();
            res.status(200).json({ success:true, msg:"Cart Data", data:addtocart_DAta });

        } catch (error) {
            res.status(400).json(error.massage);
        }
    },//ADD TO CART 
}