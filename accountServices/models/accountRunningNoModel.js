const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {

    return sequelize.define('account_running_no', {
        AccountType: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        PayType: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        RunningNo: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true,
        },
        InitNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        Branch_No: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        }
    }, {
        tableName: 'account_running_no',
        timestamps: false
    });

}
