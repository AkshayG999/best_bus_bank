const { DataTypes } = require("sequelize");


module.exports = function (sequelize) {

    return sequelize.define("member_status", {
        SrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        STATCODE: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        STATDESC: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
}