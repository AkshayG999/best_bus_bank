const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {

    const attributes = {
        TrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        TrDt: {
            type: DataTypes.STRING,
            allowNull: true
        },
        BankCode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        BankName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ParentBank: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    };

    const options = {
        freezeTableName: true,
        timestamps: true
    };

    return sequelize.define('bank-branch', attributes, options);
};
