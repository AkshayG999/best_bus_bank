const { Sequelize } = require("sequelize");
const { dbConfig } = require('../config/config');
const user = require("../userServices/models/userModel");
const parentGroup = require("../otherServices/models/parentGroupModel");
const group = require("../otherServices/models/groupModel");
const individualAccount = require("../otherServices/models/individualAccountModel");
const bank = require("../otherServices/models/bankModel");
const bankBranch = require("../otherServices/models/bankBranchModel");
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


const features = featuresModel(sequelize);
const rolePermissions = rolePermissionsModel(sequelize);
const userModel = user(sequelize);
const bankModel = bank(sequelize);
const parentGroupModel = parentGroup(sequelize);
const groupModel = group(sequelize);
const individualAccountModel = individualAccount(sequelize);
const bankBranchModel = bankBranch(sequelize);
const departmentModel = department(sequelize);


// Associations between models here
userModel.belongsTo(rolePermissions, { foreignKey: 'roleId', as: 'role_permissions' });

groupModel.belongsTo(parentGroupModel);
parentGroupModel.hasMany(groupModel);

individualAccountModel.belongsTo(groupModel, { foreignKey: 'GroupName', targetKey: 'sr_no', as: 'group' });
groupModel.hasMany(individualAccountModel, { foreignKey: 'GroupName', sourceKey: 'sr_no' });

bankBranchModel.belongsTo(bankModel, { foreignKey: 'ParentBank', targetKey: 'TrNo', as: 'bank' });

// departmentModel.belongsTo(userModel, { foreignKey: 'createdBy', as: 'user' });
// departmentModel.belongsTo(branchModel, { foreignKey: 'branchCode', as: 'branch' });

// userModel.belongsTo(branchModel, { foreignKey: 'branchId', as: 'branch' });
// userModel.belongsTo(departmentModel, { foreignKey: 'departmentId', as: 'department' });




module.exports = {
    db, sequelize, userModel, bankModel, groupModel, parentGroupModel, individualAccountModel,
    bankBranchModel, departmentModel, features, rolePermissions,
};