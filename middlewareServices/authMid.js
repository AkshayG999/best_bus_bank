const jwt = require("jsonwebtoken");
const personService = require("../userServices/services/userService");
const { errorMid } = require("./errorMid");


exports.authenticateToken = async (req, res, next) => {
    try {
        const secretKey = process.env.SECRET_KEY;
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return errorMid(401, "Unauthorized: Token not provided", req, res);
        }

        const token = authHeader.substring("Bearer ".length);

        const decoded = jwt.decode(token);

        if (!decoded)
            return errorMid(401, "Unauthorized: Invalid Access token", req, res);

        if (Date.now() > decoded.exp * 1000)
            return errorMid(440, "session expired, please login again", req, res);

        jwt.verify(token, secretKey, function (err, decoded) {
            if (err)
                return errorMid(401, "Unauthorized: Invalid Access token", req, res);
            else {
                req.systemID = decoded.systemID;
                return next();
            }
        });
    } catch (error) {
        console.log(error);
        return errorMid(401, error.message, req, res);
    }
};


exports.authorizeUser = async (req, res, next) => {
    try {
        if (req.systemID !== req.params.systemID) {
            return errorMid(403, "Forbidden: SystemID does not match", req, res);
        }
        next();
    } catch (error) {
        console.log(error);
        return errorMid(403, error.message, req, res);
    }
};
