const jwt = require("jsonwebtoken");
const personService = require("../userServices/services/userService");
const { errorMid } = require("./errorMid");

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return errorMid(
            401,
            "Unauthorized: Token not provided",
            req,
            res
        );
    }

    const token = authHeader.substring("Bearer ".length);

    try {
        // Verify the access token
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey);

        const session = await personService.findPersonBySystemID(decoded.systemID);
        // console.log({ session })
        if (!session) {
            return errorMid(
                401,
                "Unauthorized: Invalid Access token",
                req,
                res
            );
        }

        // Check expiration of the access token
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return errorMid(
                401,
                "Unauthorized: Token has expired",
                req,
                res
            );
        } else {
            req.systemID = decoded.systemID;
            next();
        }
    } catch (error) {
        console.log(error);
        return errorMid(
            403,
            "Forbidden: Invalid token",
            req,
            res
        );
    }
};
