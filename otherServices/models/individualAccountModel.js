const { DataTypes } = require("sequelize");


module.exports = model;

function model(sequelize) {
    const IndividualAccount = sequelize.define("individual-account", {
        TrNo: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        Code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AccountName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        GroupName: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        BankSrNo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        OpClosingRelatedTo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        AccSrNo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        OP_Balance: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        CL_Balance: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        ACC_DRCR: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SYSAcc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        LY_ACC_DRCR: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LYCL_Balance: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        LoanDeduct_YN: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        ExceptionChecking: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        ExceptionAmt: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },

    }, {
        freezeTableName: true,
        timestamps: true,
    });

    return IndividualAccount;
}