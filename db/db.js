const { Sequelize } = require("sequelize");
const { dbConfig } = require('../config/config');
const user = require("../userServices/models/userModel");
const featuresModel = require("../adminServices/models/featuresModel");
const rolePermissionsModel = require("../adminServices/models/rolePermissionsModel");
const parentGroup = require("../masterDataEntry/models/parentGroupModel.js");
const group = require("../masterDataEntry/models/groupModel");
const individualAccount = require("../masterDataEntry/models/individualAccountModel");
const bank = require("../masterDataEntry/models/bankModel");
const bankBranch = require("../masterDataEntry/models/bankBranchModel");
const branch = require("../masterDataEntry/models/branchModel");
const department = require("../masterDataEntry/models/departmentModel");
const zone = require("../masterDataEntry/models/zoneModel");
const depo = require("../masterDataEntry/models/depoModel");
const auditLog = require("../auditServices/auditLogModel");
const memberInformation = require("../memberRegistration/models/informationModel");
const memberAddress = require("../memberRegistration/models/addressModel");
const memberBankInfo = require('../memberRegistration/models/bankInfoModel')
const memberDocument = require('../memberRegistration/models/documentModel')
const memberNominee = require("../memberRegistration/models/nomineeModel");
const memberInstallment = require("../memberRegistration/models/installmentModel");
const memberShipType = require("../memberRegistration/models/memberShipTypeModel");
const memberStatus = require("../memberRegistration/models/memberStatusModel");





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
            // connectTimeout: 60000,
            "ssl": {
                "require": false,
                "rejectUnauthorized": false
            },
            encrypt: dbConfig.options.encrypt,
            trustServerCertificate: dbConfig.options.trustServerCertificate,
            cryptoCredentialsDetails: {
                minVersion: dbConfig.options.cryptoCredentialsDetails.minVersion
            },
            // ssl: dbConfig.options.ssl // Optionally provide SSL configuration
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);


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
const auditLogModel = auditLog(sequelize);

// Member Info 
const memberInformationModel = memberInformation(sequelize);
const memberAddressModel = memberAddress(sequelize);
const memberBankInfoModel = memberBankInfo(sequelize);
const memberDocumentModel = memberDocument(sequelize);
const memberNomineeModel = memberNominee(sequelize);
const memberInstallmentModel = memberInstallment(sequelize);
const memberShipTypeModel = memberShipType(sequelize);
const memberStatusModel = memberStatus(sequelize);


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
    db, sequelize, Sequelize, userModel, bankModel, groupModel, parentGroupModel, individualAccountModel,
    bankBranchModel, branchModel, departmentModel, features, rolePermissions, zoneModel, depoModel, auditLogModel,
    memberInformationModel, memberAddressModel, memberBankInfoModel, memberDocumentModel, memberNomineeModel, memberInstallmentModel,
    memberShipTypeModel, memberStatusModel
};