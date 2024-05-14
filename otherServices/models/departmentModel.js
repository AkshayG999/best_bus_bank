const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const department = sequelize.define("department", {
        EntryNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        EntryDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        SysNo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        MPay: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        SPay: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        ParentBranch: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DepartmentName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DepartmentNameMarathi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EmailId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ContactNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IsMainDepartment: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: true,
    });

    return department;
}
