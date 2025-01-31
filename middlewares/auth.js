const jwt = require("jsonwebtoken");
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET
const isAuth = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(408).json({
            success: false,
            message: "Session expired, Please Login"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            console.log("usernot found")
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = isAuth;
