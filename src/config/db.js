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


const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.server,
        dialect: 'mssql',
        dialectOptions: {
            encrypt: false,
            trustServerCertificate: false,
            cryptoCredentialsDetails: {
                minVersion: 'TLSv1'
            },
            ssl: {
                ca: cert
            }
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


// Define associations
groupModel.belongsTo(parentGroupModel, { foreignKey: 'groupUnder', as: 'parentgroup' });
ledgerModel.belongsTo(groupModel, { foreignKey: 'groupID', as: 'group' });
branchModel.belongsTo(userModel, { foreignKey: 'createdBy', as: 'user' });


sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });


module.exports = { db, sequelize, userModel, groupModel, parentGroupModel, ledgerModel, roleModel, branchModel };