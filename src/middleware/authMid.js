const jwt = require('jsonwebtoken');
const personService = require("../services/userService");


const secretKey =  'best_bus_bank';

const authenticateToken = async (req, res, next) => {
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
        const decoded = jwt.verify(token, secretKey);

        const session = await personService.findPersonBySystemID(decoded.systemID).exec();

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
            req.userId = decoded.userId;
            next();
        }

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: Invalid token',
        });
    }
};

module.exports = { authenticateToken };