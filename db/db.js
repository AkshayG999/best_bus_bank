const { Sequelize } = require("sequelize");
const { dbConfig } = require('../config/config');
const user = require("../userServices/models/userModel");
const featuresModel = require("../adminServices/models/featuresModel");
const rolePermissionsModel = require("../adminServices/models/rolePermissionsModel");
const parentGroup = require("../MasterDataEntry/models/parentGroupModel");
const group = require("../MasterDataEntry/models/groupModel");
const individualAccount = require("../MasterDataEntry/models/individualAccountModel");
const bank = require("../MasterDataEntry/models/bankModel");
const bankBranch = require("../MasterDataEntry/models/bankBranchModel");
const branch = require("../MasterDataEntry/models/branchModel");
const department = require("../MasterDataEntry/models/departmentModel");
const zone = require("../MasterDataEntry/models/zoneModel");
const depo = require("../MasterDataEntry/models/depoModel");



const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.server,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
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
const parentGroupModel = parentGroup(sequelize);
const groupModel = group(sequelize);
const individualAccountModel = individualAccount(sequelize);
const bankModel = bank(sequelize);
const bankBranchModel = bankBranch(sequelize);
const branchModel = branch(sequelize);
const departmentModel = department(sequelize);
const zoneModel = zone(sequelize);
const depoModel = depo(sequelize);


// Associations between models here
userModel.belongsTo(rolePermissions, { foreignKey: 'roleId', as: 'role_permissions' });

groupModel.belongsTo(parentGroupModel, { foreignKey: "GroupUnder", as: "parent_group" });
parentGroupModel.hasMany(groupModel, { foreignKey: 'GroupUnder' });

individualAccountModel.belongsTo(groupModel, { foreignKey: 'GroupName', as: 'group' });
groupModel.hasMany(individualAccountModel, { foreignKey: 'GroupName' });

bankBranchModel.belongsTo(bankModel, { foreignKey: 'ParentBank', targetKey: 'TrNo', as: 'bank' });

branchModel.belongsTo(zoneModel, { foreignKey: 'Branch_Zone', as: 'zone' });

departmentModel.belongsTo(depoModel, { foreignKey: 'Depo_SrNo', as: 'depo' });
// departmentModel.belongsTo(userModel, { foreignKey: 'createdBy', as: 'user' });
// departmentModel.belongsTo(branchModel, { foreignKey: 'branchCode', as: 'branch' });

// userModel.belongsTo(branchModel, { foreignKey: 'branchId', as: 'branch' });
// userModel.belongsTo(departmentModel, { foreignKey: 'departmentId', as: 'department' });




module.exports = {
    db, sequelize, userModel, bankModel, groupModel, parentGroupModel, individualAccountModel,
    bankBranchModel, branchModel, departmentModel, features, rolePermissions, zoneModel, depoModel
};