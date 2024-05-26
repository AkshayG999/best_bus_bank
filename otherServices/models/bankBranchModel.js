const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const attributes = {
        TrNo: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        TrDt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        BankCode: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        BankName: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        ParentBank: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
    };

    return sequelize.define('bank-branch', attributes, options);
};
// [BEST].[dbo].[Mast_Bank]