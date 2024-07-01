const { DataTypes } = require("sequelize");


module.exports = function exports(sequelize) {
    const Zone = sequelize.define("zone", {
        SrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        Zone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Zone;
}
