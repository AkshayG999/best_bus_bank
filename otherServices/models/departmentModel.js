const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const department = sequelize.define("department", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        enteryNo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        bankName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        branchName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        branchCode: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        departmentName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        departmentNameMarathi: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            autoIncrement: false,
        },
        contactNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: true,
    });

    return department;
}
