const featuresService = require("../adminServices/services/featuresService");
const userService = require("../userServices/services/userService");
const { errorMid, handleErrors } = require("./errorMid");


exports.checkPermissionsMiddleware = (
    featureID,
    featureName='',
    write = false
) => {
    return async (req, res, next) => {
        const systemID = req.systemID;
        try {
            const user = await userService.findPersonBySystemID(systemID);

            if (!user) {
                return errorMid(
                    404,
                    "User not found",
                    req,
                    res
                );
            }

            if (
                !user.dataValues.permissions ||
                user.dataValues.permissions.length === 0
            ) {
                return errorMid(
                    403,
                    `User did't have any permissions`,
                    req,
                    res
                );
            }

            // const feature = await featuresService.getFilterFeatures({ name: featureName });
            const feature = await featuresService.getFeaturesById(featureID);
            if (!feature) {
                return errorMid(
                    404,
                    "Feature not found",
                    req,
                    res
                );
            }

            const permissions = user.dataValues.permissions;
            // const featureId = feature[0].dataValues.id;

            const featureId = feature.dataValues.id;
            // console.log({ permissions, featureId, featureName })

            let accessCheck = false;
            if (write) {
                accessCheck = permissions.some(
                    (permission) =>
                        permission.id === featureId &&
                        permission.read === true &&
                        permission.write === true
                );
            } else {
                accessCheck = permissions.some(
                    (permission) =>
                        permission.id === featureId && permission.read === true
                );
            }

            if (accessCheck) {
                next();
            } else {
                errorMid(
                    403,
                    `User is not authorized to perform this action`,
                    req,
                    res
                );
            }
        } catch (error) {
            console.error("Error checking permissions:", error);
            return handleErrors(error, req, res);
        }
    };
};
