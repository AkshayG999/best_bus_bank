const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {

    return sequelize.define('member_information', {
        EntryNo: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        mem_SrNo: {
            type: DataTypes.INTEGER,
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
            // defaultValue: null,
            references: {
                model: 'branch',
                key: 'Branch_Tr'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
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
            type: DataTypes.INTEGER,
            allowNull: true,
            // defaultValue: null,
            references: {
                model: 'department',
                key: 'DeptSrNo'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        Depo_No: {
            type: DataTypes.INTEGER,
            allowNull: true,
            // defaultValue: null
            references: {
                model: 'depo',
                key: 'SRNo'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        MemberShipType: {
            type: DataTypes.INTEGER, // Ref to MemberShip type
            allowNull: true,
            // defaultValue: null
            references: {
                model: 'member_ship_type',
                key: 'SrNo'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        MemberShipStatus: {
            type: DataTypes.INTEGER, // Ref to  MEM stat
            allowNull: true,
            // defaultValue: null
            references: {
                model: 'member_status',
                key: 'SrNo'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        REMARK: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        Mem_Gender: {
            type: DataTypes.STRING,
            allowNull: true,
            // defaultValue: null,
            references: {
                model: 'gender',
                key: 'SrNo'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
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