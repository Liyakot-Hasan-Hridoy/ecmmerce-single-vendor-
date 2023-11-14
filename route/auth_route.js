const router = require("express").Router();

const bodyparser = require("body-parser");
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));

const authController = require("../controller/auth_controller");
const authtoken = require("../middleware/middleware");

router.post("/registation", authController.createuser);
router.post("/login", authController.loginUser);
router.get("/getuser",authtoken, authController.getallUser);
router.post("/update-password",authtoken, authController.updatePassword);//update password
router.post("/forget-password",authtoken, authController.forgetpassword);//FORGET PASSWORD
router.post("/reset-password",authtoken, authController.resetPassword);//RESET PASSWORD

module.exports = router;

