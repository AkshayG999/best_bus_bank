const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {

    const attributes = {
        branchNumber: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        branchName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pincode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephones: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bankCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bankName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cashAccount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pettyCash: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: true
        }
    };

    const options = {
        freezeTableName: true,
        timestamps: true
    };

    const Branch = sequelize.define('branch', attributes, options);

    return Branch;
};
