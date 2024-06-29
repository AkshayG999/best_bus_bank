const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {

    return sequelize.define('member_document', {
        EntryNo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Pancard: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Adharcard: {
            type: DataTypes.STRING,
            allowNull: true
        },
        OfficeId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        VoterID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Driving: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ElectricityBill: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        TeleBill: {
            type: DataTypes.STRING,
            allowNull: true
        },
        RationCard: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Passport: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Remarks: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'member_document',
        timestamps: false
    });

}
