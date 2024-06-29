const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const department = sequelize.define("department", {
        DeptSrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        EntryNo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        EntryDT: {
            type: DataTypes.DATE,
            allowNull: true
        },
        DeptNo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        MPayNo: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        SPayNo: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        DeptName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DeptName_Mar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Add_01: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Add_02: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Add_03: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Dept_EmailID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Dept_ContactNo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Dept_ContactPerson: {
            type: DataTypes.STRING,
            allowNull: true
        },
        IsMainDept: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        Branch_SrNo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Depo_SrNo: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return department;
};
