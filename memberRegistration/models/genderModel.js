const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {
    return sequelize.define('gender', {
        SrNo: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'gender',
        timestamps: false
    });
}