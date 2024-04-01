
// function extractReadWritePermissions
exports.extractFeaturesC = (permissions) => {
    let result = [];

    function extractPermissionsRecursive(feature) {
        if (feature.hasOwnProperty('read') && feature.hasOwnProperty('write')) {
            result.push({
                id: feature.id,
                // name: feature.name,
                read: feature.read,
                write: feature.write
            });
        }
        if (feature.children && Array.isArray(feature.children)) {
            feature.children.forEach(child => {
                extractPermissionsRecursive(child);
            });
        }
    }

    // Convert permissions object to an array containing the object itself
    const permissionsArray = Array.isArray(permissions) ? permissions : [permissions];

    permissionsArray.forEach(permission => extractPermissionsRecursive(permission));

    return result;
}


// ____________________________________________________________________________________________________________________________________________________

// // Get Feature Permissions
// exports.replacePermissions = (permissions, featuresData) => {
//     permissions.forEach(permission => {
//         featuresData.features_a.forEach(feature_a => {
//             if (feature_a.features_b && Array.isArray(feature_a.features_b)) {
//                 feature_a.features_b.forEach(feature_b => {
//                     if (feature_b.features_c && Array.isArray(feature_b.features_c)) {
//                         feature_b.features_c.forEach(feature_c => {
//                             if (feature_c.id === permission.id) {
//                                 feature_c.read = permission.read;
//                                 feature_c.write = permission.write;
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     });
//     return featuresData;
// }

exports.replaceReadWriteWithPermissions = (permissions, featuresData) => {
    function findFeatureById(data, id) {
        if (data.id === id) {
            return data;
        }
        if (data.children) {
            for (const child of data.children) {
                const found = findFeatureById(child, id);
                if (found) return found;
            }
        }
        return null;
    }

    permissions.forEach(permission => {
        // Find the corresponding feature in featuresData
        const feature = findFeatureById(featuresData, permission.id);
        if (feature) {
            // Update read and write properties
            feature.read = permission.read;
            feature.write = permission.write;
        }
    });

    return featuresData;
}

// ___________________________________________________________________________________________________________________________________________________


// Update Route Permissions
exports.concatRolePermissions = (role, permissionsData) => {
    // Create a new object to hold the updated permissions
    const updatedRole = { ...role };

    // Clone the permissions array to prevent modification of the original role
    updatedRole.permissions = [...role.permissions];

    permissionsData.forEach(permission => {
        const existingPermissionIndex = updatedRole.permissions.findIndex(p => p.id === permission.id);
        if (existingPermissionIndex !== -1) {
            // Permission exists, update read and write conditions
            updatedRole.permissions[existingPermissionIndex] = {
                ...updatedRole.permissions[existingPermissionIndex],
                read: permission.read,
                write: permission.write
            };
        } else {
            // Permission doesn't exist, add it to the role's permissions list
            updatedRole.permissions.push(permission);
        }
    });

    return updatedRole;
};




// ____________________________________________________________________________________________________________________________________________________________
exports.filterPermissions = (permissions) => {
    // Filter out permissions where both read and write are false
    return permissions.filter(permission => permission.read || permission.write);
}