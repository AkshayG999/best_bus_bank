const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('member_ship_type', {
        SrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        MemberShipType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Share_AccNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ShareVal: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        Ent_AccNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Ent_Val: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        Nomination_AccNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Nomination_Val: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        Nominal_MemShip_AccNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Nominal_MemShip_Val: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }
    }, {
        tableName: 'member_ship_type',
        timestamps: false
    });
}
