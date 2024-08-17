const { DataTypes } = require('sequelize');

const IFSC = (sequelize) => {
    return sequelize.define('IFSC', {
        BANK: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IFSC: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        BRANCH: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CENTRE: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DISTRICT: {
            type: DataTypes.STRING,
            allowNull: true
        },
        STATE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ADDRESS: {
            type: DataTypes.STRING,
            allowNull: true
        },
        CONTACT: {
            type: DataTypes.STRING,
            allowNull: true
        },
        IMPS: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        RTGS: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        CITY: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ISO3166: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NEFT: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        MICR: {
            type: DataTypes.STRING,
            allowNull: true
        },
        UPI: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        SWIFT: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'ifsc',
        timestamps: false
    });
}
module.exports = IFSC;
