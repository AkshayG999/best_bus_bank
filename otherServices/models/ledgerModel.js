const { DataTypes } = require("sequelize");


module.exports = model;

function model(sequelize) {
    const Ledger = sequelize.define("ledger", {
        sr_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            // autoIncrement: true
        },
        tr_no: {
            type: DataTypes.STRING,
            allowNull: false,
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
        op_acc_DR_CR: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        op_acc_balance: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        ly_acc_DR_CR: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ly_cl_balance: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        loan_deduct: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        loan_deduct_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        exception_checking: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        exception_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {
        freezeTableName: true,
        timestamps: true,
    });

    return Ledger;
}
