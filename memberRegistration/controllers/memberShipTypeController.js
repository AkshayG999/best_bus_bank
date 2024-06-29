const membershipTypeService = require('../services/memberShipTypeService');

// Get all membership types
exports.getAll = async function (req, res) {
    try {
        const membershipTypes = await membershipTypeService.getAllMembershipTypes();
        res.status(200).json(membershipTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a membership type by ID
exports.getById = async function (req, res) {
    try {
        const { id } = req.params;
        const membershipType = await membershipTypeService.getMembershipTypeById(id);
        if (membershipType) {
            res.status(200).json(membershipType);
        } else {
            res.status(404).json({ message: 'MembershipType not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new membership type
exports.create = async function (req, res) {
    try {
        const membershipType = await membershipTypeService.createMembershipType(req.body);
        res.status(201).json(membershipType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing membership type
exports.update = async function (req, res) {
    try {
        const { id } = req.params;
        const membershipType = await membershipTypeService.updateMembershipType(id, req.body);
        res.status(200).json(membershipType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a membership type
exports.deleteMembershipType = async function (req, res) {
    try {
        const { id } = req.params;
        await membershipTypeService.deleteMembershipType(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
