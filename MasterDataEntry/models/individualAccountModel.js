const { DataTypes } = require("sequelize");


module.exports = model;

function model(sequelize) {
    const IndividualAccount = sequelize.define("individual-account", {
        AccSrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        TrNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        AccountName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        GroupName: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BankSrNo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        OpClosingRelatedTo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        OP_Balance: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        CL_Balance: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        ACC_DRCR: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SYSAcc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        LY_ACC_DRCR: {
            type: DataTypes.STRING,
            allowNull: true
        },
        LYCL_Balance: {
            type: DataTypes.DECIMAL,
            allowNull: true
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
        timestamps: false,
    });

    return IndividualAccount;
}

// [BEST].[dbo].[Mast_Account]