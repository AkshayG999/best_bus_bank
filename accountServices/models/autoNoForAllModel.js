const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {

    return sequelize.define('auto_no_for_all', {
        type: {
            type: DataTypes.STRING(20),
        },
        autoId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fYear: {
            type: DataTypes.INTEGER,
        },
        cId: {
            type: DataTypes.INTEGER,
        },
        forTrans: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        tableName: 'auto_no_for_all',
        timestamps: false
    });

}
