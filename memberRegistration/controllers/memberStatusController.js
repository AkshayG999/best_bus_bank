const statusService = require('../services/memberStatusService');

// Get all statuses
exports.getAll = async function (req, res) {
    try {
        const statuses = await statusService.getAllStatuses();
        res.status(200).json(statuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a status by ID
exports.getById = async function (req, res) {
    try {
        const { id } = req.params;
        const status = await statusService.getStatusById(id);
        if (status) {
            res.status(200).json(status);
        } else {
            res.status(404).json({ message: 'Status not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new status
exports.create = async function (req, res) {
    try {
        const status = await statusService.createStatus(req.body);
        res.status(201).json(status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing status
exports.update = async function (req, res) {
    try {
        const { id } = req.params;
        const status = await statusService.updateStatus(id, req.body);
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a status
exports.deleteStatus = async function (req, res) {
    try {
        const { id } = req.params;
        await statusService.deleteStatus(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
