const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        TrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        TrDt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        BankCode: {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        BankName: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        Remarks: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },

    };
    const options = {
        freezeTableName: true,
        timestamps: false,
    };

    return sequelize.define("bank", attributes, options);
};

// [BEST].[dbo].[Mast_Bank_Parent]