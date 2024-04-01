const { Sequelize } = require("sequelize");
const { dbConfig } = require('./config');
const fs = require('fs');
const cert = fs.readFileSync('src/best-bus-pem.pem');
require("dotenv").config();
const user = require("../models/userModel");
const parentGroup = require("../models/parentGroupModel");
const group = require("../models/groupModel");
const ledger = require("../models/ledgerModel");
const roles = require("../models/rolesModel");
const branch = require("../models/branchModel");
const department = require("../models/departmentModel");
const { features_model_master } = require("../models/featuresModel/features_master_model");
const { features_model_A } = require("../models/featuresModel/features_A_model");
const { features_model_B } = require("../models/featuresModel/features_B_model");
const { features_model_C } = require("../models/featuresModel/features_C_model");
const { features_master_permission_model, features_B_permission_model, features_C_permission_model, features_A_permission_model } = require("../models/featuresPermissionModel/features_permission_model");
const featuresModel = require("../models/featuresModel");
const rolePermissionsModel = require("../models/rolePermissionsModel");


const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.server,
        port: dbConfig.port,
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            encrypt: dbConfig.options.encrypt,
            trustServerCertificate: dbConfig.options.trustServerCertificate,
            cryptoCredentialsDetails: {
                minVersion: dbConfig.options.cryptoCredentialsDetails.minVersion
            },
            // ssl: dbConfig.options.ssl // Optionally provide SSL configuration
        }
    }
);

// const sequelize = new Sequelize(
//     dbConfig.database,
//     dbConfig.user,
//     dbConfig.password,
//     {
//         host: dbConfig.server,
//         port: dbConfig.port, // Use the specified port
//         dialect: 'postgres', // Use the correct dialect for PostgreSQL
//         dialectOptions: {
//             encrypt: dbConfig.options.encrypt,
//             trustServerCertificate: dbConfig.options.trustServerCertificate,
//             cryptoCredentialsDetails: {
//                 minVersion: dbConfig.options.cryptoCredentialsDetails.minVersion
//             },
//             // ssl: dbConfig.options.ssl // Optionally provide SSL configuration
//         }
//     }
// );


const db = {};


const userModel = user(sequelize);
const parentGroupModel = parentGroup(sequelize);
const groupModel = group(sequelize);
const ledgerModel = ledger(sequelize);
const roleModel = roles(sequelize);
const branchModel = branch(sequelize);
const departmentModel = department(sequelize);

const features_master = features_model_master(sequelize);
const features_A = features_model_A(sequelize);
const features_B = features_model_B(sequelize);
const features_C = features_model_C(sequelize);
// const features_permission = features_permission_model(sequelize);

const features_master_permission = features_master_permission_model(sequelize);
const features_A_permission = features_A_permission_model(sequelize);
const features_B_permission = features_B_permission_model(sequelize);
const features_C_permission = features_C_permission_model(sequelize);

const features = featuresModel(sequelize);
const rolePermissions = rolePermissionsModel(sequelize);

// groupModel.belongsTo(parentGroupModel, { foreignKey: 'groupUnder', as: 'parentgroup' });
// ledgerModel.belongsTo(groupModel, { foreignKey: 'groupID', as: 'group' });
// branchModel.belongsTo(userModel, { foreignKey: 'createdBy', as: 'user' });

departmentModel.belongsTo(userModel, { foreignKey: 'createdBy', as: 'user' });
departmentModel.belongsTo(branchModel, { foreignKey: 'branchCode', as: 'branch' });

// userModel.belongsTo(branchModel, { foreignKey: 'branchId', as: 'branch' });
// userModel.belongsTo(departmentModel, { foreignKey: 'departmentId', as: 'department' });

// userModel.belongsToMany(features_permission, { foreignKey: 'featuresPermissionId', as: 'features_permission' });
// features_permission.belongsToMany(userModel, { foreignKey: 'userId', as: 'user' });


// features_master.hasMany(features_A, { as: 'features_A' });
// features_A.belongsTo(features_master, { foreignKey: 'featuresMasterId', as: 'features_master' });

// features_A.hasMany(features_B, { as: 'features_B' });
// features_B.belongsTo(features_A, { foreignKey: 'featuresAId', as: 'features_A' });

// features_B.hasMany(features_C, { as: 'features_C' });
// features_C.belongsTo(features_B, { foreignKey: 'featuresBId', as: 'features_B' });

// features_master.belongsToMany(userModel, { through: features_master_permission });
// features_A.belongsToMany(userModel, { through: features_A_permission });
// features_B.belongsToMany(userModel, { through: features_B_permission });
// features_C.belongsToMany(userModel, { through: features_C_permission });

// // ---
// roleModel.hasMany(features_master_permission);
// roleModel.hasMany(features_A_permission);
// roleModel.hasMany(features_B_permission);
// roleModel.hasMany(features_C_permission);

// features_master_permission.belongsTo(roleModel);
// features_A_permission.belongsTo(roleModel);
// features_B_permission.belongsTo(roleModel);
// features_C_permission.belongsTo(roleModel);
// // ---

// features_master_permission.hasMany(features_A_permission, { as: 'a_permission' });
// features_master_permission.belongsTo(features_master);

// // features_A_permission.hasMany(features_B_permission);
// features_A_permission.hasMany(features_B_permission, { as: 'b_permission' });
// features_A_permission.belongsTo(features_master_permission);
// features_A_permission.belongsTo(features_A);

// // features_B_permission.hasMany(features_C_permission);
// features_B_permission.hasMany(features_C_permission, { as: 'c_permission' });
// features_B_permission.belongsTo(features_A_permission);
// features_B_permission.belongsTo(features_B);

// features_C_permission.belongsTo(features_B_permission);
// features_C_permission.belongsTo(features_C, { as: "features_C" });




module.exports = {
    db, sequelize, userModel, groupModel, parentGroupModel, ledgerModel, roleModel, branchModel, departmentModel, features, rolePermissions,
    features_master, features_A, features_B, features_C,
    features_master_permission, features_A_permission, features_B_permission, features_C_permission
};