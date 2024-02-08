const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        roleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accessibility: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
    };

    return sequelize.define("roles", attributes, options);
}