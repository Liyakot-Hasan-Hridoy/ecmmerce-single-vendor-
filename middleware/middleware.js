const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, config.secrerkye, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({ error: "Invalide token" });
                }
                req.user = user;

                next();
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
}

// const verifyToken = async (req, res, next) => {
//     const token = req.body.token || req.query.token || req.headers["authorization"];

//     if (!token) {
//         res.status(200).json({success:false, msg:"Token missing"});
//     }

//     try {
//         const decode = jwt.verify(token,config.secrerkye);
//         req.user = decode;
//     } catch (error) {
//         res.status(400).json("INVALID TOKEN");
//     }
//      next();
// }

// tokenMiddleware

module.exports = verifyToken;