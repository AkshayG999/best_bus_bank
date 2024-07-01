const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        Branch_Tr: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        Branch_TrDt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        Branch_Code: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        Branch_Name: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        Branch_Add_01: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        Branch_Add_02: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        Branch_Add_03: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        Branch_City: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        Branch_District: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        Branch_Pin: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        Branch_State: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        Branch_Zone: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Branch_Tel_01: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        Branch_Tel_02: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        Branch_Location: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        BankCode: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        CashCode_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        BankCode_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        PettyCash_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        FD_SrNo: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true
        },
        RD_SrNo: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true
        },
        JAC_SrNo: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true
        },
        BranchVouTitle: {
            type: DataTypes.STRING(1050),
            allowNull: true
        },
        RegdNo: {
            type: DataTypes.STRING(1050),
            allowNull: true
        },
        BranchVouHeaderName: {
            type: DataTypes.STRING(1050),
            allowNull: true
        },
        Branch_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        Pigme_SrNo: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true
        },
        RecoCode_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        LoanBondNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        NetPaidAccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        BankAccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        CashAccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        FDPaymentAccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        OtherReceiotAccNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        FDLoadAdj_AccSrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        FDCustomer_No: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true
        },
        Branch_active: {
            type: DataTypes.SMALLINT,
            allowNull: true
        }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };

    return sequelize.define("branch", attributes, options);
};

// [BEST].[dbo].[Mast_Branch]