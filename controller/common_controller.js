const Product = require("../model/product_model");
const User = require("../model/auth_model");
const Category = require("../model/category_model");
const SubCategory = require("../model/subcategory_model");



module.exports = {

    // COUNT DATA 
    dataCount: async (req, res) => {
        try {
            const count_Data = [];
            const product_data = await Product.find().count();
            const user_data = await User.find({type:1}).count();
            const category_data = await Category.find().count();
            const subcategory_data = await SubCategory.find().count();     
            

            count_Data.push({
                product:product_data,
                vendor:user_data,
                category: category_data,
                subcategory:subcategory_data
            })
            
            res.status(200).json({success:true, msg:"Counting Data", data:count_Data, });
        } catch (error) {
            res.status(400).json(error.message);
        }
    },// COUNT DATA 
}