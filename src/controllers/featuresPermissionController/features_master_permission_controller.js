const featuresMasterPermissionService = require('../../services/featuresPermissionService/features_master_permission_service');


module.exports = {

    async create(req, res) {
        try {
            const featuresMasterPermission = await featuresMasterPermissionService.create(req.body);
            res.status(201).json(featuresMasterPermission);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },


    async findAll(req, res) {
        try {
            const { systemID } = req.body;

            if (systemID) {
                const featuresMasterPermissions = await featuresMasterPermissionService.findAllBySystemID(systemID);
                return res.status(200).json(featuresMasterPermissions);
            }
            const featuresMasterPermissions = await featuresMasterPermissionService.findAll();
            return res.status(200).json(featuresMasterPermissions);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;

            const featuresMasterPermission = await featuresMasterPermissionService.findById(id);

            if (!featuresMasterPermission) {
                return res.status(404).json({ message: 'Features master permission not found' });
            } else {
                return res.status(200).json(featuresMasterPermission);
            }
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },


    async findOne(req, res) {
        try {
            const featuresMasterPermission = await featuresMasterPermissionService.findOne(req.params.id);
            if (!featuresMasterPermission) {
                return res.status(404).json({ message: 'Features master permission not found' });
            } else {
                return res.status(200).json(featuresMasterPermission);
            }
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },


    async update(req, res) {
        try {
            const updatedFeaturesMasterPermission = await featuresMasterPermissionService.update(req.params.id, req.body);
            return res.status(200).json(updatedFeaturesMasterPermission);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },


    async delete(req, res) {
        try {
            await featuresMasterPermissionService.delete(req.params.id);
            return res.status(204).end("Deleted successfully");
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};
