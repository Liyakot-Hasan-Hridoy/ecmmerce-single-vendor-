const User = require("../model/auth_model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");//SECRET KYE.......
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

// RESET PASSWORD MAIL
const sendResetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });

        const mailOption = {
            from: config.emailUser,
            to: email,
            subject: "for Reset Password",
            // html: "<p> Hii " + name + ", Please copy the link and <a href='http://localhost:3000/api/reset-password?token=" + token + "'> reset your password</a> "
            html: `<p> Hi ${name}, Please copy the link and <a href='http://localhost:3000/api/reset-password?token=${token}'> reset your password</a></p>`
        }

        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail has been send:- ", info.response);
            }
        });

    } catch (error) {
        res.status(400).json(error.massage);
    }

};// RESET PASSWORD MAIL



//JWT TOKEN 
const creat_token = async (id) => {
    try {
        const token = jwt.sign({ _id: id }, "ok");
        return token;
    } catch (error) {
        res.status(400).json(error.massage);
    }
};//JWT TOKEN


// Password validation
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        res.status(400).send(error.massage);
    }
};// Password validation


// IMAGE VALIDATION
const stroege = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "public/authimage");
    },

    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalide file type"), false);
    }
};

const upload = multer({
    storage: stroege,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});// IMAGE VALIDATION





module.exports = {

    // CREATE USER
    createuser: async (req, res) => {
        try {
            upload.single("image")(req, res, async (err) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }

                const sPassword = await securePassword(req.body.password);

                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    image: req.file.filename,
                    password: sPassword,
                    type: req.body.type
                });
                const email = req.body.email;
                const userData = await User.findOne({ email: email });

                if (userData) {

                    res.status(200).send({ success: false, msg: "This Email Alrady Exgist" });

                } else {

                    const user_data = await user.save();
                    res.status(200).send({ success: true, data: user_data });

                }

            });
        } catch (error) {
            res.status(400).json(error);
        }
    },// CREATE USER


    // LOGIN USER
    loginUser: async (req, res) => {

        try {

            const email = req.body.email;
            const password = req.body.password;

            const userData = await User.findOne({ email: email });

            if (userData) {

                const passwordMatch = await bcrypt.compare(password, userData.password);

                if (passwordMatch) {

                    const token = await creat_token(userData._id);

                    const userResult = {
                        _id: userData._id,
                        name: userData.name,
                        email: userData.email,
                        phone: userData.phone,
                        image: userData.image,
                        type: userData.type,
                        token: token
                    }



                    // const token = jwt.sign({ email: user.email, id: user._id }, secretkey);

                    res.status(200).json({ success: true, msg: "User Details", data: userResult });

                } else {

                    return res.status(200).json({ success: false, msg: "LOGIN DETAILS ARE INCORRECT" });
                }
            } else {

                return res.status(200).json({ success: false, msg: "LOGIN DETAILS ARE INCORRECT" });

            }


        } catch (error) {
            res.status(400).json(error);
        }


    },// LOGIN USER


    // GET ALL USER
    getallUser: async (req, res) => {
        const allUserData = await User.find();
        res.status(200).json(allUserData);
    },// GET ALL USER

    //UPDATE PASSWOED 
    updatePassword: async (req, res) => {
        try {
            const user_id = req.body.user_id;
            const password = req.body.password;
            const data = await User.findOne({ _id: user_id });
            if (data) {
                const newPassword = await securePassword(password);
                const updateData = await User.findByIdAndUpdate({ _id: user_id }, {
                    $set: {
                        password: newPassword
                    }
                });

                res.status(200).json({ success: true, msg: "Password Update Successfully", updateData });

            } else {

                res.status(200).json({ success: false, msg: "Password not found!" });
            }
        } catch (error) {
            res.status(400).json(error.massage);
        }
    },//UPDATE PASSWOED 



    //FORGET-PASSWORD
    forgetpassword: async (req, res) => {
        try {
            const email = req.body.email;
            const userData = await User.findOne({ email: email });

            if (userData) {

                const randomString = randomstring.generate();
                await User.updateOne({ email: email }, { $set: { token: randomString } });

                sendResetPasswordMail(userData.name, userData.email, randomString);

                res.status(200).json({ success: true, msg: "Please check your inbox of mail and reset your password." });

            } else {
                res.status(200).json({ success: false, msg: "This email does not Exists." });
            }

        } catch (error) {
            res.status(400).json(error.massage);
        }
    },//FORGET-PASSWORD



    //RESET PASSWORD
    resetPassword: async (req, res) => {

        try {
            const token = req.query.token;
            const tokenData = await User.findOne({ token: token });
            if (tokenData) {
                const password = req.body.password;
                const newPassword = await securePassword(password);
                const userData = await User.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: newPassword, token: "" } }, { new: true });
                res.status(200).json({ success: true, msg: "User password has been reset", data: userData });
            } else {
                res.status(200).json({ success: false, msg: "This link has been expired." });
            }
        } catch (error) {
            res.status(400).json(error.massage);
        }

    },//RESET PASSWORD





    // UPDATE USER
    // updateprofile: async (req, res) => {
    //     try {
    //         upload.single("image")(req, res, async (err) => {
    //             if (err) {
    //                 return res.status(400).json({ error: err.message });
    //             }

    //             const userId = req.params.id;

    //             const existinguser = await User.findById(userId);

    //             if (!existinguser) {
    //                 return res.status(404).json({ error: "User Not Found" });
    //             }

    //             existinguser.name = req.body.name;
    //             existinguser.email = req.body.email;
    //             existinguser.phone = req.body.phone;
    //             existinguser.address = req.body.address;

    //             if (req.file) {

    //                 if (existinguser.image) {
    //                     const imagePath = existinguser.image;

    //                     fs.unlink(imagePath, (err) => {
    //                         if (err) {
    //                             console.error("Error Deleting Image:", err);
    //                         }
    //                     });

    //                 }

    //                 existinguser.image = req.file.path;
    //                 existinguser.image = null;
    //             }

    //             const updateUser = await existinguser.save();
    //             res.status(200).json(updateUser);
    //         });
    //     } catch (error) {
    //         return res.status(400).json({ error: error.message });
    //     }

    // }// UPDATE USER

}