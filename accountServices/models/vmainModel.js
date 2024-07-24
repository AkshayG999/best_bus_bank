const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {

    return sequelize.define('vmain', {
        TransNo: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        TransDt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        V_TYPE: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        V_NO: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        TransType: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        AccNo: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        V_DT: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        V_ENTDT: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Amount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        Acc_No: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        Narrionation: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        V_NAR1: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        V_NAR2: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        V_ENO: {
            type: DataTypes.DECIMAL(18,0),
            allowNull: true,
        },
        MEMBERNO: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        V_CHKNO: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        BNK_NAM: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        RECO_DT: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        LCODE: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        LDATE: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        LTIME: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        INWARD: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        PURPOSE: {
            type: DataTypes.STRING(2),
            allowNull: true,
        },
        LOANCD: {
            type: DataTypes.STRING(3),
            allowNull: true,
        },
        SUBOFF: {
            type: DataTypes.STRING(3),
            allowNull: true,
        },
        CHQDRF: {
            type: DataTypes.STRING(1),
            allowNull: true,
        },
        PCODE: {
            type: DataTypes.STRING(2),
            allowNull: true,
        },
        PIN: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SLNO: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        INST_DT: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        SLIP_DT: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        MTH: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        YR: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        ST_DATE: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        AppYesNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        AppDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        AppBy: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        TokenNo: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        Trans_Branch: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        Mon_No: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        Year_No: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        Dept: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        mysrno: {
            type: DataTypes.DECIMAL(18,0),
            allowNull: false,
        },
        PinNo: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        SerialNo: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Print_YN: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        Print_Dt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Prev_Chq_No: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        ChequeOnName: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        FDRegSrNo: {
            type: DataTypes.DECIMAL(18,0),
            allowNull: true,
        },
        User_Dept: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        SendToNeft_Branch: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SendToNeft_User_Branch: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SendToNeft_User_DATE_Branch: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        SendToNeft_Bank: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SendToNeft_User_Bank: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SendToNeft_User_DATE_Bank: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        tableName: 'vmain',
        timestamps: true
    });

}
