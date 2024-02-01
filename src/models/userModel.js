// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const User = sequelize.define('User', {
//   loginID: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   systemID: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });

// module.exports = User;


const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    loginID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    systemID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };

  const options = {
    freezeTableName: true,
    timestamps: true,
  };
  return sequelize.define("user", attributes, options);
}