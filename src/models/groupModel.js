const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const Group = sequelize.define("group", {
        TRNo: {
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
        grp_srNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
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
