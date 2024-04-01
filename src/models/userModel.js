const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // middleName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // lastName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    systemID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permissions: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    bankId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    branchId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    departmentId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    allocatedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
  };

  const options = {
    freezeTableName: true,
    timestamps: false,
  };

  return sequelize.define("user", attributes, options);
}