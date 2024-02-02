const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
      primaryKey: true, // Set systemID as the primary key
      autoIncrement: false, // Disable auto-increment
    }
  };

  const options = {
    freezeTableName: true,
    timestamps: false,
  };

  return sequelize.define("user", attributes, options);
}