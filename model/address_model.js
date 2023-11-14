const mongoose  = require("mongoose");

const addressSchema = mongoose.Schema({

    user_id:{
        type:String,
        pequired: true
    },

    address:{
        type:Array,
        pequired: true
    },
});

module.exports = mongoose.model("Address", addressSchema);