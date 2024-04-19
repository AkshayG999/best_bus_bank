const { Sequelize } = require("sequelize");
const { dbConfig } = require('../config/config');
const user = require("../userServices/models/userModel");
const parentGroup = require("../otherServices/models/parentGroupModel");
const group = require("../otherServices/models/groupModel");
const ledger = require("../otherServices/models/ledgerModel");
const branch = require("../otherServices/models/branchModel");
const department = require("../otherServices/models/departmentModel");
const featuresModel = require("../adminServices/models/featuresModel");
const rolePermissionsModel = require("../adminServices/models/rolePermissionsModel");



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
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            },
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
const branchModel = branch(sequelize);
const departmentModel = department(sequelize);
const features = featuresModel(sequelize);
const rolePermissions = rolePermissionsModel(sequelize);


// Associations between models here
userModel.belongsTo(rolePermissions, { foreignKey: 'roleId', as: 'role_permissions' });

groupModel.belongsTo(parentGroupModel);
parentGroupModel.hasMany(groupModel);

ledgerModel.belongsTo(groupModel);
groupModel.hasMany(ledgerModel);


// departmentModel.belongsTo(userModel, { foreignKey: 'createdBy', as: 'user' });
// departmentModel.belongsTo(branchModel, { foreignKey: 'branchCode', as: 'branch' });

// userModel.belongsTo(branchModel, { foreignKey: 'branchId', as: 'branch' });
// userModel.belongsTo(departmentModel, { foreignKey: 'departmentId', as: 'department' });




module.exports = {
    db, sequelize, userModel, groupModel, parentGroupModel, ledgerModel,
    branchModel, departmentModel, features, rolePermissions,
};