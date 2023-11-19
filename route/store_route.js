const store_router = require("express").Router();


const bodyparser = require("body-parser");
store_router.use(bodyparser.json());
store_router.use(bodyparser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");


// IMAGE VALIDATION
const stroege = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "public/storeImage");
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

const storeController = require("../controller/store_controller");
const authtoken = require("../middleware/middleware");

store_router.post("/create_store",authtoken, upload.single("logo"), storeController.createStore);
store_router.post("/find-nearest-store",authtoken, storeController.findneareststore);
store_router.get("/get-all-store",authtoken, storeController.get_allStore);

module.exports = store_router;