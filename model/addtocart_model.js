const mongoose = require("mongoose");


const addtocartSchema = mongoose.Schema({

    product_id: {
        type: String,
        required: true,
      
    },
  
    user_id:{
        type: String,
        required: true, 
        default:""
    },
});

module.exports = mongoose.model("Add-to-Cart", addtocartSchema);