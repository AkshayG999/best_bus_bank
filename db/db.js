const { Sequelize } = require("sequelize");
const { dbConfig } = require('../config/config');
const user = require("../userServices/models/userModel");
const featuresModel = require("../adminServices/models/featuresModel");
const rolePermissionsModel = require("../adminServices/models/rolePermissionsModel");
const parentGroup = require("../master_data_entry/models/parentGroupModel");
const group = require("../master_data_entry/models/groupModel");
const individualAccount = require("../master_data_entry/models/individualAccountModel");
const bank = require("../master_data_entry/models/bankModel");
const bankBranch = require("../master_data_entry/models/bankBranchModel");
const branch = require("../master_data_entry/models/branchModel");
const department = require("../master_data_entry/models/departmentModel");
const zone = require("../master_data_entry/models/zoneModel");
const depo = require("../master_data_entry/models/depoModel");
const auditLog = require("../auditServices/auditLogModel");
const memberInformation = require("../memberRegistration/models/informationModel");
const memberAddress = require("../memberRegistration/models/addressModel");
const memberBankInfo = require('../memberRegistration/models/bankInfoModel')
const memberDocument = require('../memberRegistration/models/documentModel')
const memberNominee = require("../memberRegistration/models/nomineeModel");
const memberInstallment = require("../memberRegistration/models/installmentModel");
const memberShipType = require("../memberRegistration/models/memberShipTypeModel");
const memberStatus = require("../memberRegistration/models/memberStatusModel");
const memberRelation = require("../memberRegistration/models/relationModel");
const gender = require("../memberRegistration/models/genderModel");

//Account Services Database Registrations

const autoNoForAll = require("../accountServices/models/autoNoForAllModel");
const accountRunningNo = require("../accountServices/models/accountRunningNoModel");
const accountBreakup = require("../accountServices/models/accountBreakupModel");
const vmain = require("../accountServices/models/vmainModel");
const vmainRel = require("../accountServices/models/vmainRelModel");






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
const memberRelationModel = memberRelation(sequelize);
const genderModel = gender(sequelize);

//Account Services
const autoNoForAllModel = autoNoForAll(sequelize);
const accountRunningNoModel = accountRunningNo(sequelize);
const accountBreakupModel = accountBreakup(sequelize);
const vmainModel = vmain(sequelize);
const vmainRelModel = vmainRel(sequelize);


// Associations between models here
userModel.belongsTo(rolePermissions, { foreignKey: 'roleId', as: 'role_permissions' });

groupModel.belongsTo(parentGroupModel, { foreignKey: "GroupUnder", as: "parent_group" });
parentGroupModel.hasMany(groupModel, { foreignKey: 'GroupUnder' });

individualAccountModel.belongsTo(groupModel, { foreignKey: 'GroupName', as: 'group' });
groupModel.hasMany(individualAccountModel, { foreignKey: 'GroupName' });

bankBranchModel.belongsTo(bankModel, { foreignKey: 'ParentBank', targetKey: 'TrNo', as: 'bank' });

branchModel.belongsTo(zoneModel, { foreignKey: 'Branch_Zone', as: 'zone' });

departmentModel.belongsTo(depoModel, { foreignKey: 'Depo_SrNo', as: 'depo' });

accountRunningNoModel.belongsTo(branchModel, { foreignKey: 'Branch_No', as: 'branch' });

vmainRelModel.belongsTo(vmainModel, { foreignKey: 'EntryNo', as: 'vmain' });
vmainModel.hasMany(vmainRelModel, { foreignKey: 'TransNo' });

accountBreakupModel.belongsTo(vmainModel, { foreignKey: 'TransNo', as: 'vmain' });
vmainModel.hasMany(accountBreakupModel, { foreignKey: 'TransNo' });

// departmentModel.belongsTo(userModel, { foreignKey: 'createdBy', as: 'user' });
// departmentModel.belongsTo(branchModel, { foreignKey: 'branchCode', as: 'branch' });

// userModel.belongsTo(branchModel, { foreignKey: 'branchId', as: 'branch' });
// userModel.belongsTo(departmentModel, { foreignKey: 'departmentId', as: 'department' });

memberInformationModel.belongsTo(branchModel, { foreignKey: 'Mem_Branch', as: 'branch' });
memberInformationModel.belongsTo(departmentModel, { foreignKey: 'DeptSrNo', as: 'department' });
memberInformationModel.belongsTo(depoModel, { foreignKey: 'Depo_No', as: 'depo' });
memberInformationModel.belongsTo(memberShipTypeModel, { foreignKey: 'MemberShipType', as: 'member_ship_type' });
memberInformationModel.belongsTo(memberStatusModel, { foreignKey: 'MemberShipStatus', as: 'member_status' });
memberInformationModel.belongsTo(genderModel, { foreignKey: 'Mem_Gender', as: 'gender' });

memberNomineeModel.belongsTo(memberRelationModel, { foreignKey: 'Nom_Rel', as: 'member_relation' });



module.exports = {
    db, sequelize, Sequelize, userModel, bankModel, groupModel, parentGroupModel, individualAccountModel,
    bankBranchModel, branchModel, departmentModel, features, rolePermissions, zoneModel, depoModel, auditLogModel,
    memberInformationModel, memberAddressModel, memberBankInfoModel, memberDocumentModel, memberNomineeModel, memberInstallmentModel,
    memberShipTypeModel, memberStatusModel, autoNoForAllModel, accountRunningNoModel, accountBreakupModel, vmainModel, vmainRelModel, memberRelationModel, genderModel
};