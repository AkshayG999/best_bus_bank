
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
