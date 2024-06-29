const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('member_installment', {
        MNO: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        CHECKNO: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SHARE: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        MSD: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        DBF: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        MTLN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        MTLN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        TOPLN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        TOPLN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        EDULN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        EDULN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        EMG2LN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        EMG2LN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        CONLN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        CONLN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        EMG1LN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        EMG1LN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        STLN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        STLN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        FLDLN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        FLDLN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        MSDLN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        MSDLN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        FDLN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        FDLN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        SURE1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SURE2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        MEDILN: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        MEDILN_ROI: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        srno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    }, {
        tableName: 'member_installment',
        timestamps: false
    });

}
