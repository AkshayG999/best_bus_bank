const featuresService = require("../adminServices/services/featuresService");
const userService = require("../userServices/services/userService");



exports.checkPermissionsMiddleware = (featureID, featureName, write = false) => {
    return async (req, res, next) => {
        const systemID = req.systemID;
        try {

            const user = await userService.findPersonBySystemID(systemID);

            if (!user) {
                return res.status(404).send({ success: false, message: 'User not found' });
            }
            if (!user.dataValues.permissions || user.dataValues.permissions.length === 0) {
                return res.status(403).send({ success: false, message: `User is did't have any permissions` });
            }

            // const feature = await featuresService.getFilterFeatures({ name: featureName });
            const feature = await featuresService.getFeaturesById(featureID);
            if (!feature) {
                return res.status(404).send({ success: false, message: 'Feature not found' });
            }

            const permissions = user.dataValues.permissions;
            // const featureId = feature[0].dataValues.id;
            const featureId = feature.dataValues.id;
            // console.log({ permissions, featureId, featureName })

            let checkAccess = false;
            if (write) {
                checkAccess = permissions.some(permission =>
                    permission.id === featureId && permission.read === true && permission.write === true);

            } else {
                checkAccess = permissions.some(permission =>
                    permission.id === featureId && permission.read === true);
            }

            if (checkAccess) {
                next();
            } else {
                return res.status(403).send({ success: false, message: `User is not authorized to perform this action` });
            }
        } catch (error) {
            console.error('Error checking permissions:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
