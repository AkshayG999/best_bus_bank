
exports.buildHierarchy = (data, parentId, level) => {
    let result = [];
    for (let item of data) {
        if (item.parentFeatureId === parentId) {
            let children = this.buildHierarchy(data, item.id, level + 1);
            if (children.length) {
                item[`children`] = children;
            }
            result.push(item);
        }
    }
    return result;
}

exports.formatHierarchy = (featuresList) => {
    let masterFeatures = this.buildHierarchy(featuresList, null, 0);
    return masterFeatures;
}

exports.generateHierarchy = (masterId, featuresList, level = 0) => {
    // console.log({ typeof: typeof featuresList });
    // console.log(featuresList);

    const masterFeature = featuresList.find(feature => feature.id === masterId);
    if (!masterFeature) return null;

    const childFeatures = featuresList.filter(feature => feature.parentFeatureId === masterId);

    const hierarchy = {
        id: masterFeature.id,
        name: masterFeature.name,
        label: masterFeature.label,
        description: masterFeature.description,
        icon: masterFeature.icon,
        link: masterFeature.link,
        parentFeatureId: masterFeature.parentFeatureId,
        parentId: masterFeature.parentId,
    };

    if (childFeatures.length > 0) {
        hierarchy[`children`] = childFeatures.map(child => this.generateHierarchy(child.id, featuresList, level + 1));
    }

    return hierarchy;
}


// exports.featuresWithReadWrite = (masterId, featuresList, level = 0) => {

//     const masterFeature = featuresList.find(feature => feature.id === masterId);
//     if (!masterFeature) return null;

//     const childFeatures = featuresList.filter(feature => feature.parentFeatureId === masterId);

//     const hierarchy = {
//         id: masterFeature.id,
//         name: masterFeature.name,
//         description: masterFeature.description,
//         parentFeatureId: masterFeature.parentFeatureId,
//     };

//     if (childFeatures.length > 0) {
//         hierarchy[`features_${String.fromCharCode(97 + level)}`] = childFeatures.map(child => {
//             // Recursively generate hierarchy for each child
//             const childHierarchy = this.featuresWithReadWrite(child.id, featuresList, level + 1);

//             // Modify child feature's features_c property if it exists
//             if (childHierarchy && childHierarchy.features_c) {
//                 childHierarchy.features_c = childHierarchy.features_c.map(feature => ({
//                     ...feature,
//                     read: false,
//                     write: false
//                 }));
//             }

//             return childHierarchy;
//         });
//     }

//     return hierarchy;
// }


// // _________________This is a recursive function for New Role Get False data_____________________
// exports.featuresWithReadWrite = (masterId, featuresList, level = 0) => {

//     const masterFeature = featuresList && featuresList.children && featuresList.children.find(feature => feature.id === masterId);
//     if (!masterFeature) return null;

//     const childFeatures = masterFeature.children || [];

//     const hierarchy = {
//         id: masterFeature.id,
//         name: masterFeature.name,
//         description: masterFeature.description,
//         parentFeatureId: masterFeature.parentFeatureId,
//     };

//     if (childFeatures.length > 0) {
//         hierarchy.children = childFeatures.map(child => {

//             const childHierarchy = this.featuresWithReadWrite(child.id, featuresList, level + 1);

//             if (childHierarchy) {
//                 childHierarchy.read = false;
//                 childHierarchy.write = false;
//             }

//             return childHierarchy;
//         });
//     }

//     return hierarchy;
// };

exports.featuresWithReadWrite = (masterId, featuresList, level = 0) => {
    const masterFeature = featuresList.find(feature => feature.id === masterId);
    if (!masterFeature) return null;

    const childFeatures = featuresList.filter(feature => feature.parentFeatureId === masterId);

    const hierarchy = {
        id: masterFeature.id,
        name: masterFeature.name,
        label: masterFeature.label,
        description: masterFeature.description,
        icon: masterFeature.icon,
        link: masterFeature.link,
        parentFeatureId: masterFeature.parentFeatureId,
        parentId: masterFeature.parentId,
        read: false, // Adding read option as false for every element
        write: false, // Adding write option as false for every element
    };

    if (childFeatures.length > 0) {
        hierarchy[`children`] = childFeatures.map(child => this.featuresWithReadWrite(child.id, featuresList, level + 1));
    }

    return hierarchy;
}

exports.featuresReadWriteWithChildItem = (masterId, featuresList, level = 0) => {
    const masterFeature = featuresList.find(feature => feature.id === masterId);
    if (!masterFeature) return null;

    const childFeatures = featuresList.filter(feature => feature.parentFeatureId === masterId);

    const hierarchy = {
        id: masterFeature.id,
        label: masterFeature.label,
        icon: masterFeature.icon,
        link: masterFeature.link,
        parentId: masterFeature.parentId,
        read: false, // Adding read option as false for every element
        write: false, // Adding write option as false for every element
    };

    // Set isChildItem property based on if the current feature has children
    hierarchy.isChildItem = level > 0 && childFeatures.length > 0;

    if (childFeatures.length > 0) {
        hierarchy.children = childFeatures.map(child => {
            const childHierarchy = this.featuresReadWriteWithChildItem(child.id, featuresList, level + 1);
            // Add isChildItem property based on if the child has children
            childHierarchy.isChildItem = childHierarchy.children ? true : false;
            return childHierarchy;
        });
    }
    return hierarchy;
}



exports.filterAndModify = (input) => {
    if (!input.children || input.children.length === 0) {
        if (!input.read && !input.write) {
            return null; // Skip this element
        }
        return input; // Keep this element
    }

    const filteredChildren = input.children.map(child => this.filterAndModify(child)).filter(Boolean);

    if (filteredChildren.length === 0) {
        return null; // Skip this element if all children are skipped
    }

    return {
        ...input,
        children: filteredChildren
    };
}