const { features_A_permission, features_master, features_A, features_B, features_C, features_B_permission, features_C_permission } = require('../../config/db');

const FeaturesMasterPermission = require('../../config/db').features_master_permission;


module.exports = {

    async create(featuresMasterPermissionData) {
        return await FeaturesMasterPermission.create(featuresMasterPermissionData);
    },

    // async findAll(systemID) {
    //     return await FeaturesMasterPermission.findAll({
    //         where: { userSystemID: systemID },
    //         attributes: ["id", "read", "write", "userSystemID"],
    //         include: [
    //             {
    //                 model: features_master,
    //                 as: 'features_master'
    //             },
    //             {   
    //                 model: features_A_permission,
    //                 as: 'features_A_permissions',
    //                 include: [
    //                     {
    //                         model: features_A,
    //                         as: 'features_A',
    //                     },
    //                     {
    //                         model: features_B_permission,
    //                         as: 'features_B_permissions',
    //                         include: [
    //                             {
    //                                 model: features_B,
    //                                 as: 'features_B',
    //                             },
    //                         ]
    //                     }
    //                 ]

    //             }
    //         ]
    //     });
    // },

    async findAllBySystemID(systemID) {
        return await FeaturesMasterPermission.findAll({
            where: { userSystemID: systemID },
            // attributes: ["id", "read", "write", "userSystemID"],
            include: [
                {
                    model: features_master,
                    as: 'features_master'
                },
                {
                    model: features_A_permission,
                    as: 'a_permission',
                    include: [
                        {
                            model: features_A,
                            as: 'features_A',
                        },
                        {
                            model: features_B_permission,
                            as: 'b_permission', // Unique alias for features_B_permission
                            include: [
                                {
                                    model: features_B,
                                    as: 'features_B',
                                },
                                {
                                    model: features_C_permission,
                                    as: 'c_permission',
                                    // attributes: ["id", "read", "write",],

                                    include: [
                                        {
                                            model: features_C,
                                            as: 'features_C',
                                            // attributes: ['id', 'name', 'description', 'createdAt', 'updatedAt', 'featuresBId']
                                        }
                                    ],
                                }
                            ]
                        }
                    ]
                },
            ],
        });
    },
    async findById(id) {
        return await FeaturesMasterPermission.findByPk(id, {
            attributes: ["id", "read", "write",],
            include: [
                {
                    model: features_master,
                    as: 'features_master',
                    attributes: ["id", "name"],

                },
                {
                    model: features_A_permission,
                    as: 'a_permission',
                    attributes: ["id", "read", "write",],

                    include: [
                        {
                            model: features_A,
                            as: 'features_A',
                            attributes: ["id", "name"],

                        },
                        {
                            model: features_B_permission,
                            as: 'b_permission',
                            attributes: ["id", "read", "write",],

                            include: [
                                {
                                    model: features_B,
                                    as: 'features_B',
                                    attributes: ["id", "name"],
                                },
                                {
                                    model: features_C_permission,
                                    as: 'c_permission',
                                    attributes: ["id", "read", "write",],

                                    include: [
                                        {
                                            model: features_C,
                                            as: 'features_C',
                                            attributes: ["id", "name"],
                                        }
                                    ],
                                }
                            ]
                        }
                    ]
                },
            ],
        });
    },



    async findOne(id) {
        return await FeaturesMasterPermission.findByPk(id);
    },

    async findAll() {
        return await FeaturesMasterPermission.findAll();
    },

    async update(id, featuresMasterPermissionData) {
        const featuresMasterPermission = await FeaturesMasterPermission.findByPk(id);
        if (!featuresMasterPermission) {
            throw new Error('Features master permission not found');
        }
        await featuresMasterPermission.update(featuresMasterPermissionData);
        return featuresMasterPermission;
    },


    async delete(id) {
        const featuresMasterPermission = await FeaturesMasterPermission.findByPk(id);
        if (!featuresMasterPermission) {
            throw new Error('Features master permission not found');
        }
        await featuresMasterPermission.destroy();
    }
};