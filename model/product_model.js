const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    vendor_id: {
        type: String,
        required: true
    },
    store_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    subcategory_id: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true,
        validate:[arrayLimit, "You can pass only 5 product images"]
    },
});
function arrayLimit(valu){
    return valu.length <= 5;
}
module.exports = mongoose.model("Product", productSchema);