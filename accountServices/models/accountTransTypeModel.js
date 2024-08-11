const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('account_trans_type', {
        SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        AccTransType: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
    }, {
        tableName: 'account_trans_type',
        timestamps: false
    });

}
