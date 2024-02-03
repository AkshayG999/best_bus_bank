const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const Ledger = sequelize.define("ledger", {
        TRNo: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        groupID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        acc_Sr_No: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
        },
        op_acc_DR_CR: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        op_acc_balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ly_acc_DR_CR: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ly_cl_balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        loan_deduct: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        loan_deduct_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        exception_checking: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        exception_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    }, {
        freezeTableName: true,
        timestamps: true,
    });

    return Ledger;
}
