const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, 'ok', (err, decoded) => {
                if (err) {
                    console.error(err);
                    return res.status(401).json({ success: false, msg: "Invalid token" });
                }
                req.user = decoded;
                next();
            });
        } else {
            return res.status(401).json({ success: false, msg: "Invalid or missing token in the Authorization header" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Internal Server error" });
    }
};

module.exports = verifyToken;
