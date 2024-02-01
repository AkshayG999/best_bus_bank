const { Sequelize } = require("sequelize");
const personModel = require("../models/userModel");
require("dotenv").config();


const sequelize = new Sequelize(
    'best-bus-database',
    'Best_bus_db',
    'best-bus-123',
    {
        host: 'db-best-bus.cxvnuvhxv2yf.ap-south-1.rds.amazonaws.com',
        port: 1433,
        dialect: 'mssql',
        dialectOptions: {
            options: { encrypt: false },
        },
    }
);

const db = {};
db.Person = personModel(sequelize);
// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;