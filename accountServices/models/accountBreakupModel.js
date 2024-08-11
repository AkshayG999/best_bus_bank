const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {

    return sequelize.define('account_breakup', {
        TransNo: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        Tr_Type: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        Payment_Receipt: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        EntryDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Vs_Dt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        AccCode: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        Amount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        DRCR: {
            type: DataTypes.STRING(2),
            allowNull: true,
        },
        PartyCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        RecoDt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ShareEntered: {
            type: DataTypes.STRING(5),
            allowNull: true,
        },
        EntryNo: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        RecoRemark: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Reco_InsNo: {
            type: DataTypes.DECIMAL(18,0),
            allowNull: true,
        },
    }, {
        tableName: 'account_breakup',
        timestamps: false
    });

}
