const router = require("express").Router();

const bodyparser = require("body-parser");
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));

const authController = require("../controller/auth_controller");
// const authtoken = require("../middleware/middleware");

router.post("/registation", authController.createuser);
router.post("/login", authController.loginUser);
router.get("/getuser", authController.getallUser);
router.post("/update-password", authController.updatePassword);//update password
router.post("/forget-password", authController.forgetpassword);//FORGET PASSWORD
router.get("/reset-password", authController.resetPassword);//RESET PASSWORD

module.exports = router;

