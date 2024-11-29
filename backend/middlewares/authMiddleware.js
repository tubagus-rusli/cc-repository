const admin = require("firebase-admin");

exports.verifyToken = async (req, res, next) => {
    const tokern = req.headers.authorization?.split(" ")[i];
    if(!token) return res.status(401).json({ message: "Token is Mising" });

    try {
        const decodedToken = await admin.auth().verifyToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token", error: error.message });
    }
};