const Category = require("../model/category_model");

module.exports = {

    //CATEGORY ADD
    addCategory: async (req, res) => {

        try {

            const cat_data = await Category.find();

            if (cat_data.length > 0) {

                let checking = false;
                const cat_check = req.body.category;
                for (let i = 0; i < cat_data.length; i++) {
                    if (cat_data[i]['category'].toLowerCase() === cat_check.toLowerCase()) {
                        checking = true;
                        break;
                    }
                }

                if (checking == false) {
                    const category = new Category({
                        category: req.body.category
                    });
                    const categoryData = await category.save();
                    res.status(200).json({ success: true, msg: "Category Data", data: categoryData });
                } else {
                    res.status(200).json({ success: false, msg: "This Category (" + req.body.category + ") is already exists." });
                }


            } else {
                const category = new Category({
                    category: req.body.category
                });
                const categoryData = await category.save();

                res.status(200).json({ success: true, msg: "Category Data", data: categoryData });
            }


        } catch (error) {
            res.status(400).json(error.message);
        }

    },//CATEGORY ADD

    //GET CATEGORY
    getCategoryes: async () => {
        try {
            return Category.find();
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}