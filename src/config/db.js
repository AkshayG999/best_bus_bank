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
const { features_model_master } = require("../models/features_master_model");
const { features_model_A } = require("../models/features_A_model");
const { features_model_B } = require("../models/features_B_model");
const { features_model_C } = require("../models/features_C_model");
const features_permission_model = require("../models/features_permission_model");


// const sequelize = new Sequelize(
//     dbConfig.database,
//     dbConfig.user,
//     dbConfig.password,
//     {
//         host: dbConfig.server,
//         dialect: 'mssql',
//         dialectOptions: {
//             encrypt: false,
//             trustServerCertificate: false,
//             cryptoCredentialsDetails: {
//                 minVersion: 'TLSv1'
//             },
//             ssl: {
//                 ca: cert
//             }
//         }
//     }
// );

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.server,
        port: dbConfig.port, // Use the specified port
        dialect: 'postgres', // Use the correct dialect for PostgreSQL
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
const features_permission = features_permission_model(sequelize);


// groupModel.belongsTo(parentGroupModel, { foreignKey: 'groupUnder', as: 'parentgroup' });
// ledgerModel.belongsTo(groupModel, { foreignKey: 'groupID', as: 'group' });
// branchModel.belongsTo(userModel, { foreignKey: 'createdBy', as: 'user' });

// departmentModel.belongsTo(userModel, { foreignKey: 'createdBy', as: 'user' });
// departmentModel.belongsTo(branchModel, { foreignKey: 'branchCode', as: 'branch' });

// userModel.belongsTo(branchModel, { foreignKey: 'branchId', as: 'branch' });
// userModel.belongsTo(departmentModel, { foreignKey: 'departmentId', as: 'department' });


features_master.hasMany(features_A, { as: 'features_A' });
features_A.belongsTo(features_master, { foreignKey: 'featuresMasterId', as: 'features_master' });

features_A.hasMany(features_B, { as: 'features_B' });
features_B.belongsTo(features_A, { foreignKey: 'featuresAId', as: 'features_A' });

features_B.hasMany(features_C, { as: 'features_C' });
features_C.belongsTo(features_B, { foreignKey: 'featuresBId', as: 'features_B' });

// userModel.belongsTo(features_permission, { foreignKey: 'featuresPermissionId', as: 'features_permission' });
features_permission.belongsTo(userModel, { foreignKey: 'userId', as: 'user' });

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });


module.exports = {
    db, sequelize, userModel, groupModel, parentGroupModel, ledgerModel, roleModel, branchModel, departmentModel,
    features_master, features_A, features_B, features_C, features_permission
};