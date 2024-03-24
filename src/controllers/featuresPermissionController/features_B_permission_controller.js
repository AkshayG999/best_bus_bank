const features_B_permission_service = require("../../services/featuresPermissionService/features_B_permission_service");



module.exports = {

    async create(req, res) {
        try {
            const { userSystemID, featuresAId, featuresMasterPermissionId, read, write } = req.body;
            const newPermission = await features_B_permission_service.create({ userSystemID, featuresAId, featuresMasterPermissionId, read, write });
            res.status(201).json(newPermission);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    async findOne(req, res) {
        try {
            const featuresMasterPermission = await features_B_permission_service.findOne(req.params.id);
            if (!featuresMasterPermission) {
                res.status(404).json({ message: 'Features master permission not found' });
            } else {
                res.status(200).json(featuresMasterPermission);
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const permissions = await features_B_permission_service.findAll();
            res.status(200).json(permissions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    async update(req, res) {
        try {
            const { permissionId } = req.params;
            const { read, write } = req.body;
            const updatedPermission = await features_B_permission_service.update(permissionId, read, write);
            res.status(200).json(updatedPermission);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    async delete(req, res) {
        try {
            const { id } = req.params;
            await features_B_permission_service.delete(id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}