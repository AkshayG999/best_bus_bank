const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {

    return sequelize.define('member_information', {
        mem_SrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        EntryNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        EntryDT: {
            type: DataTypes.DATE,
            allowNull: true
        },
        TokenNo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        Mem_Branch: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        MemCode: {
            type: DataTypes.STRING, // Check No.
            allowNull: true,
            defaultValue: null 
        },
        SHFOLIO: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        Mem_Name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null 
        },
        DOJBest: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null 
        },
        DojSoc: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null 
        },
        DOR: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null 
        },
        MPayNo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        SPayNo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        DeptSrNo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        Depo_No: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        MemberShipType: {
            type: DataTypes.STRING, // Ref to MemberShip type
            allowNull: true,
            defaultValue: null 
        },
        MemberShipStatus: {
            type: DataTypes.STRING, // Ref to  MEM stat
            allowNull: true,
            defaultValue: null 
        },
        REMARK: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null 
        },
        Mem_Gender: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        Mem_Married: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null 
        },
        Mem_MobileNo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        Mem_EMailId: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        TelPhNo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        BD_DD: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null 
        },
        BD_MM: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null 
        },
        BD_YYYY: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null 
        },
        DSTAT: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        STAT: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        ACCOUNTSTA: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        OPP_STATUS: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        Pancard: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        AdharCard: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        AccNo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        },
        Accno_TransNo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null 
        }
    }, {
        tableName: 'member_information',
        timestamps: false
    });
}



// Basic details
// personal Info