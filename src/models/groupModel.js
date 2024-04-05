const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const Group = sequelize.define("group", {
        sr_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            // autoIncrement: true
        },
        tr_no: {
            type: DataTypes.STRING,
            allowNull: false,
            autoIncrement: false,
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentGroupId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: true,
    });

    return Group;
}
