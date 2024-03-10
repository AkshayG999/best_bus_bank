const { DataTypes } = require('sequelize')


function features_permission_model(sequelize) {
    const attributes = {
        permissions: {
            type: DataTypes.JSONB,
            allowNull: false,

        }
    }
    const options = {
        freezeTableName: true,
        timestamps: true,
    }

    return sequelize.define('features_permission', attributes, options);
}

module.exports = features_permission_model;


[
    {
        "id": "18e241bced538rk18",
        "name": "Reports",
        "features_A": [
            {
                "id": "18e241bf8a9c07cgq",
                "name": "Reports Viewer",
                "featuresMasterId": "18e241bced538rk18",
                "read": true,
                "write": true,
                "features_B": [
                    {
                        "id": "18e24285f18ndyo5j",
                        "name": "Account",
                        "featuresAId": "18e241bf8a9c07cgq",
                        "read": true,
                        "write": true,
                        "features_C": [
                            {
                                "id": "18e2449de31j274w9",
                                "name": "Receipt/Payment",
                                "featuresBId": "18e24285f18ndyo5j",
                                "read": true,
                                "write": true,
                            },
                            {
                                "id": "18e2453ec08wzfjyc",
                                "name": "Ledgers",
                                "featuresBId": "18e24285f18ndyo5j",
                                "read": true,
                                "write": false,
                            }
                        ]
                    },
                    {
                        "id": "18e24558700qcrz3w",
                        "name": "Deposite",
                        "featuresAId": "18e241bf8a9c07cgq",
                        "read": true,
                        "write": true,
                        "features_C": []
                    }
                ]
            }
        ]
    },
    {
        "id": "18e26c24f99hy7y83",
        "name": "Master",
        "features_A": [
            {
                "id": "18e26c33f7508pwx3",
                "name": "Master Data Entery",
                "description": "Data Entery view sections",
                "featuresMasterId": "18e26c24f99hy7y83",
                "read": true,
                "write": true,
                "features_B": [
                    {
                        "id": "18e26c3facdbx2e0f",
                        "name": "Account",
                        "featuresAId": "18e26c33f7508pwx3",
                        "read": true,
                        "write": true,
                        "features_C": [
                            {
                                "id": "18e26c4cad24n3sr5",
                                "name": "Group Under Name",
                                "featuresBId": "18e26c3facdbx2e0f",
                                "read": true,
                                "write": true,
                            },
                            {
                                "id": "18e26c4f9f5lj2sjd",
                                "name": "Group Name",
                                "featuresBId": "18e26c3facdbx2e0f",
                                "read": true,
                                "write": false,
                            }
                        ]
                    }
                ]
            },
            {
                "id": "18e26c6a0ebzukgpr",
                "name": "Member Registration",
                "featuresMasterId": "18e26c24f99hy7y83",
                "read": true,
                "write": true,
                "features_B": []
            },
            {
                "id": "18e26c6d3d092icwe",
                "name": "Member Query",
                "featuresMasterId": "18e26c24f99hy7y83",
                "read": true,
                "write": true,
                "features_B": []
            }
        ]
    }
]