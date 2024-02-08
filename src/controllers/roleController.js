const roleService = require('../services/roleService');

async function createRole(req, res) {
    try {
        const { roleName, accessibility } = req.body;

        const role = await roleService.createRole(roleName.toUpperCase(), accessibility.toUpperCase());
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getRoles(req, res) {
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getRoleById(req, res) {
    try {
        const role = await roleService.getRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateRole(req, res) {
    try {
        const updatedRole = await roleService.updateRole(req.params.id, req.body);
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteRole(req, res) {
    try {
        await roleService.deleteRole(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole
};

