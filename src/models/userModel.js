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
      primaryKey: true,
      autoIncrement: false,
    },
    role: {
      type: DataTypes.STRING,
      DEFAULT: "user",
      allowNull: true,
    },

  };

  const options = {
    freezeTableName: true,
    timestamps: false,
  };

  return sequelize.define("user", attributes, options);
}