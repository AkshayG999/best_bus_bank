
// function extractReadWritePermissions
// exports.extractLastChildPermissions = (permissions) => {
//     let result = [];

//     function extractPermissionsRecursive(feature) {
//         if (feature.hasOwnProperty('read') && feature.hasOwnProperty('write')) {
//             result.push({
//                 id: feature.id,
//                 // name: feature.name,
//                 read: feature.read,
//                 write: feature.write
//             });
//         }
//         if (feature.children && Array.isArray(feature.children)) {
//             feature.children.forEach(child => {
//                 extractPermissionsRecursive(child);
//             });
//         }
//     }

//     // Convert permissions object to an array containing the object itself
//     const permissionsArray = Array.isArray(permissions) ? permissions : [permissions];

//     permissionsArray.forEach(permission => extractPermissionsRecursive(permission));

//     return result;
// }

exports.extractLastChildPermissions = (permissions) => {
    let result = [];

    function extractLastChildren(feature) {
        if (feature.children && feature.children.length > 0) {
            feature.children.forEach(child => {
                extractLastChildren(child);
            });
        } else {
            result.push({
                id: feature.id,
                // name: feature.name,
                // description: feature.description,
                // parentFeatureId: feature.parentFeatureId,
                read: feature.read,
                write: feature.write,
                // Add other properties if needed
                // Assuming you want to include all properties of the last child
                // ...feature
            });
        }
    }

    // Convert permissions object to an array containing the object itself
    const permissionsArray = Array.isArray(permissions) ? permissions : [permissions];

    permissionsArray.forEach(permission => extractLastChildren(permission));

    return result;
}


// ____________________________________________________________________________________________________________________________________________________

// exports.replaceReadWriteWithPermissions = (permissions, featuresData) => {
//     function findFeatureById(data, id) {
//         if (data.id === id) {
//             return data;
//         }
//         if (data.children) {
//             for (const child of data.children) {
//                 const found = findFeatureById(child, id);
//                 if (found) return found;
//             }
//         }
//         return null;
//     }

//     function updateParentPermissions(feature) {
//         if (!feature.parentFeatureId) return; // If it's the root, stop recursion
//         const parentFeature = findFeatureById(featuresData, feature.parentFeatureId);
//         if (!parentFeature) return; // If parent feature not found, stop recursion
//         parentFeature.read = parentFeature.read || feature.read; // Update parent's read if child has read
//         parentFeature.write = parentFeature.write || feature.write; // Update parent's write if child has write
//         updateParentPermissions(parentFeature); // Recursively update parent permissions
//     }

//     permissions.forEach(permission => {
//         // Find the corresponding feature in featuresData
//         const feature = findFeatureById(featuresData, permission.id);
//         if (feature) {
//             // Update read and write properties
//             feature.read = permission.read;
//             feature.write = permission.write;
//             if (permission.read) {
//                 updateParentPermissions(feature); // Update read permissions for parents
//             }
//             if (permission.write) {
//                 updateParentPermissions(feature); // Update write permissions for parents
//             }
//         }
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

    function updateParentPermissions(feature) {
        if (!feature.parentFeatureId) return; // If it's the root, stop recursion
        const parentFeature = findFeatureById(featuresData, feature.parentFeatureId);
        if (!parentFeature) return; // If parent feature not found, stop recursion

        // Update parent's read based on its children's read values
        parentFeature.read = parentFeature.children.every(child => child.read);

        // Update parent's write based on its children's write values
        parentFeature.write = parentFeature.children.every(child => child.write);

        // Recursively update parent permissions
        updateParentPermissions(parentFeature);
    }

    permissions.forEach(permission => {
        // Find the corresponding feature in featuresData
        const feature = findFeatureById(featuresData, permission.id);
        if (feature) {
            // Update read and write properties
            feature.read = permission.read;
            feature.write = permission.write;
            if (permission.read || permission.write) {
                updateParentPermissions(feature); // Update parent permissions
            }
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


exports.concatOriginalFeatures = (originalExtractedLastChild, permissionsData) => {

    // // Create a new object to hold the updated permissions
    // const updatedRole = { ...role };

    // // Clone the permissions array to prevent modification of the original role
    // updatedRole.permissions = [...role.permissions];

    permissionsData.forEach(permission => {
        const existingPermissionIndex = originalExtractedLastChild.findIndex(p => p.id === permission.id);
        if (existingPermissionIndex !== -1) {
            // Permission exists, update read and write conditions
            originalExtractedLastChild[existingPermissionIndex] = {
                ...originalExtractedLastChild[existingPermissionIndex],
                read: permission.read,
                write: permission.write
            };
        } else {
            // Permission doesn't exist, add it to the role's permissions list
            originalExtractedLastChild.push(permission);
        }
    });

    return originalExtractedLastChild;
};


// ____________________________________________________________________________________________________________________________________________________________
exports.filterPermissions = (permissions) => {
    // Filter out permissions where both read and write are false
    return permissions.filter(permission => permission.read || permission.write);
}
