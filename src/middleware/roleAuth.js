const personService = require("../../userServices/services/userService");



const roleAuth = (roles) => {
    return async (req, res, next) => {
        try {

            const role = req.role;
            const systemID = req.systemID;

            if (!role) {
                return res.status(403).json({
                    success: false,
                    message: "Role information missing in the request"
                });
            }

            const findUser = await personService.findPersonBySystemID(systemID);

            if (!findUser) {
                return res.status(400).send({ success: false, message: "user not found!" });
            }

            if (!roles.includes(findUser.role)) {
                return res.status(403).send({ success: false, message: `User with role '${req.role}' is not authorized to perform this action` });
            }
            next();

        } catch (err) {
            console.log({ err });
            return res.status(403).json({
                success: false,
                message: `Error in the Role Auth:${err}`
            });
        }
    }
}


module.exports = { roleAuth }