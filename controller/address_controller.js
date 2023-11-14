const Address = require("../model/address_model");

module.exports = {

    //ADD ADDRESS
    mul_address: async(req, res) => {
        try {

            const add_data = await Address.findOne({ user_id: req.body.user_id });

            if (add_data) {
                
                var addAddress = [];
                for(let i= 0; i<add_data.address.length;i++){
                    addAddress.push(add_data.address[i]);

                }

                addAddress.push(req.body.address);

                const update_Address = await Address.findOneAndUpdate(
                    {user_id:req.body.user_id},
                    {$set:{address:addAddress}},
                    {returnDocument: "after"}
                );

                res.status(200).json({success:true, msg:"Address Details", data:update_Address});
            } else {


                const address = new Address({
                    user_id: req.body.user_id,
                    address: req.body.address
                });
                const address_Data = await address.save();
                res.status(200).json({success:true, msg:"Address Details", data:address_Data});

            }

            
            

        } catch (error) {
            res.status(400).json(error.message);
        }
    },//ADD ADDRESS


}