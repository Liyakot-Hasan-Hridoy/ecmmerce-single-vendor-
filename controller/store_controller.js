const Store = require("../model/store_model");
const User = require("../model/auth_model");

module.exports = {

    //CREATE STORE 
    createStore: async (req, res) => {

        try {
            const userData = await User.findOne({ _id: req.body.vendor_id });
            if (userData) {

                if (!req.body.latitude || !req.body.longitude) {
                    res.status(200).json({ success: false, msg: "Location not Found!" });
                } else {
                    const vendor_id = req.body.vendor_id;
                    const vendorData = await Store.findOne({ vendor_id: vendor_id });

                    if (vendorData) {
                        res.status(200).json({ success: false, msg: "This vendor is already created a store." });
                    } else {
                        const store = new Store({
                            vendor_id: req.body.vendor_id,
                            logo: req.file.filename,
                            business_email: req.body.business_email,
                            address: req.body.address,
                            pin: req.body.pin,
                            location: {
                                type: "Point",
                                coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
                            }
                        });
                        const storeData = await store.save();
                        res.status(200).json({ success: true, msg: "Store Data", data: storeData });
                    }

                }

            } else {
                res.status(200).json({ success: false, msg: "vendor id does not exists." });
            }

        } catch (error) {
            res.status(400).json(error.message);
        }



    },//CREATE STORE 

    //GET store for product CATEGORY
    getStore: async (id) => {
        try {
            return Store.findOne({ _id: id });
        } catch (error) {
            res.status(400).json(error.message);
        }
    },//GET store for product CATEGORY


    //FIND NEAREST STORE
    findneareststore: async (req, res) => {
        try {

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;
            const storeData = await Store.aggregate([
                {
                    $geoNear: {
                        near: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                        key: "location",
                        maxDistance: parseFloat(1000) * 1609,
                        distanceField: "dist.calculated",
                        spherical: true
                    }
                }
            ]);

            res.status(200).json({success:true, msg:"store Details",dara:storeData});

        } catch (error) {
            res.status(400).json(error.message);
        }
    },//FIND NEAREST STORE

}