const mongoose = require("mongoose");

const byeproductSchema = mongoose.Schema({

    product_id: {
        type: String,
        required: true
    },

    transection_id: {
        type: String,
        required: true
    },

    vendor_id: {
        type: String,
        required: true
    },

    store_id: {
        type: String,
        required: true
    },

    customer_id: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Bye_Product", byeproductSchema);