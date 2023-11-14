const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({

    category_id:{
        type:String,
        required:true
    },
    sub_category:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model("SubCategory",subcategorySchema);