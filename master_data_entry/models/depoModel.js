const { DataTypes } = require("sequelize");


module.exports = function (sequelize) {
    const Depo = sequelize.define("depo", {
        SRNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        DepoCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DepoName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Depo;
};
