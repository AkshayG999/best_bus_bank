const { createPermission, getPermission, updatePermission, deletePermission } = require("../services/featuresPermissionService");


const createUserPermissions = async (req, res) => {
    const { userId, permissions } = req.body;
    try {
        await createPermission(userId, permissions);
        res.status(201).send({ message: 'Permission created successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


const getUserPermissions = async (req, res) => {
    const { userId } = req.params;
    try {
        const permission = await getPermission(userId);
        res.status(200).send(permission);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Define method to update user permissions by userId
const updateUserPermissions = async (req, res) => {
    const { userId } = req.params;
    const { permissions } = req.body;
    try {
        await updatePermission(userId, permissions);
        res.status(200).send({ message: 'Permission updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Define method to delete user permissions by userId
const deleteUserPermissions = async (req, res) => {
    const { userId } = req.params;
    try {
        await deletePermission(userId);
        res.status(200).send({ message: 'Permission deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { createUserPermissions, getUserPermissions, updateUserPermissions, deleteUserPermissions };


// const { features_master, features_A, features_B, features_C } = require('./path/to/models'); // Import your Sequelize models
// const { getUserPermissions } = require('./path/to/userPermissionModel'); // Import the method to get user permissions

// // Function to populate tables based on user permissions
// const populateTablesFromPermissions = async (userId) => {
//     try {
//         // Fetch permissions for the specified user
//         const userPermissions = await getUserPermissions(userId);
//         if (!userPermissions) {
//             console.error('User permissions not found.');
//             return;
//         }

//         // Extract permissions data
//         const { feature_master, feature_A, feature_B, feature_C } = userPermissions.permissions;

//         // Populate feature_master table
//         await features_master.bulkCreate(feature_master);

//         // Populate feature_A table
//         await features_A.bulkCreate(feature_A);

//         // Populate feature_B table
//         await features_B.bulkCreate(feature_B);

//         // Populate feature_C table
//         await features_C.bulkCreate(feature_C);

//         console.log('Tables populated successfully.');
//     } catch (error) {
//         console.error('Error populating tables from permissions:', error);
//     }
// };

// // Usage: Call the function with the userId
// populateTablesFromPermissions(userId);