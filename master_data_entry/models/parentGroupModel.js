const { DataTypes } = require("sequelize");


function model(sequelize) {
    return sequelize.define("parent_group", {
        sr_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
}

module.exports = model;
