const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {

    const attributes = {
        TrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Branch_TrDt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Branch_Code: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        Branch_Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Branch_Add_01: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_Add_02: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_Add_03: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_City: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_District: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_Pin: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        Branch_State: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_Zone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_Tel_01: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_Tel_02: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_Location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        BankCode: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },


        CashCode_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        BankCode_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        PettyCash_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        FD_SrNo: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true,
        },
        RD_SrNo: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true,
        },
        JAC_SrNo: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true,
        },
        BranchVouTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        RegdNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        BranchVouHeaderName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Branch_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        Pigme_SrNo: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true,
        },
        RecoCode_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        LoanBondNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        NetPaidAccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        BankAccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        CashAccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        FDPaymentAccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        OtherReceiotAccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        FDLoadAdj_AccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        FDCustomer_No: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true,
        },
        BranchActive: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },

    }
    const options = {
        freezeTableName: true,
        timestamps: true,
    }

    return sequelize.define("branch", attributes, options);
}