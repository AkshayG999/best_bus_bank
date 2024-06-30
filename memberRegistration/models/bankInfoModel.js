const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {

    return sequelize.define('member_bank_info', {
        EntryNo: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        Mem_Bank_AcNo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Mem_Bank_IFSCCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Mem_Bank_Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Mem_Bank_BranchName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Mem_Bank_PanNo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Mem_Bank_AdharCardNo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Mem_Bank_UIDNo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Mem_Bank_OtherNo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        MICR: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'member_bank_info',
        timestamps: false
    });

}
