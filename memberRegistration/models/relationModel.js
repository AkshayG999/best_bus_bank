const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('member_relation', {
        SrNo: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        RelationName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'member_relation',
        timestamps: false
    });
};
