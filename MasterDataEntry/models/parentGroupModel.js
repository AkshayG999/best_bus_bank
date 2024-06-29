const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const ParentGroup = sequelize.define("parent_group", {
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

    return ParentGroup;
}
