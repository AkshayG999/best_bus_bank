const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {

    return sequelize.define('vmain_rel', {
        EntryNo: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
        },
        AccCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        AccDesc: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        Amount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        TrType: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        Debit: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        Credit: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        Remarks: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Acc_No: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        UserNam: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        TRMode: {
            type: DataTypes.STRING(10),
            allowNull: true,
        }
    }, {
        tableName: 'vmain_rel',
        timestamps: true
    });

}
