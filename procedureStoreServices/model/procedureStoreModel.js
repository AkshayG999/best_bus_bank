const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/db');


// Define model for storing increment and month data
function procedure_store(sequelize) {
    const attributes = {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        increment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        month: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
    return sequelize.define('procedure_store', attributes);
}

exports.procedure_store_model = procedure_store(sequelize);
