const Subcategory = require("../model/subcategory_model");

module.exports = {
    addSubcategory: async (req, res) => {
        try {

            const checkSubCategory = await Subcategory.find({ category_id: req.body.category_id });
            if (checkSubCategory.length > 0) {

                let checking = false;
                const check_subCategory = req.body.sub_category;
                for (let i = 0; i < checkSubCategory.length; i++) {
                    if (checkSubCategory[i]['sub_category'].toLowerCase() === check_subCategory.toLowerCase()) {
                        checking = true;
                        break;
                    }
                }

                if (checking == false) {

                    const subCategory = new Subcategory({
                        category_id: req.body.category_id,
                        sub_category: req.body.sub_category
                    });
                    const subcategoryData = await subCategory.save();
                    res.status(200).json({ success: true, msg: "Sub-Category Details", data: subcategoryData });

                } else {
                    res.status(200).json({ success: false, msg: "This Sub_Category ("+req.body.sub_category+") is alrady exiests"});
                }

            } else {

                const subCategory = new Subcategory({
                    category_id: req.body.category_id,
                    sub_category: req.body.sub_category
                });
                const subcategoryData = await subCategory.save();
                res.status(200).json({ success: true, msg: "Sub-Category Details", data: subcategoryData });
            }


        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}