const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const Group = sequelize.define("group", {
        TRNo: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        groupUnder: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        grp_srNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        freezeTableName: true,
        timestamps: true,
    });

    return Group;
}
