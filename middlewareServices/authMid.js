const jwt = require('jsonwebtoken');
const personService = require("../userServices/services/userService");



exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Token not provided',
        });
    }

    const token = authHeader.substring('Bearer '.length);

    try {
        // Verify the access token
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey);

        const session = await personService.findPersonBySystemID(decoded.systemID);
        // console.log({ session })
        if (!session) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Invalid Access token',
            });
        }

        // Check expiration of the access token
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Refresh Token has expired',
            });

        } else {
            req.systemID = decoded.systemID;
            next();
        }

    } catch (error) {
        console.log(error);
        return res.status(403).json({
            success: false,
            message: 'Forbidden: Invalid token',
        });
    }
};
