const ByeProduct = require("../model/bye_product_model");

module.exports = {


    //BYE PRODUCT
    byeProduct: async (req, res) => {
        try {
            const byeproduct = new ByeProduct({
                product_id: req.body.product_id,
                transection_id:req.body.transection_id,
                vendor_id:req.body.vendor_id,
                store_id:req.body.store_id,
                customer_id:req.body.customer_id
            });

            const byeproductData = await byeproduct.save();

            res.status(200).json({ success:true, msg: "Bye Product Deatails.", data:byeproductData });

        } catch (error) {
            res.status(400).json(error.message);
        }
    },//BYE PRODUCT


}