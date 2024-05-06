const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {

    const attributes = {
        TrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        TrCr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        BankCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        BankName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Remarks: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    }
    const options = {
        freezeTableName: true,
        timestamps: true,
    }

    return sequelize.define("bank", attributes, options);
}