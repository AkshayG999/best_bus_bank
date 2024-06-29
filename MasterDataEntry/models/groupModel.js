const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Group = sequelize.define("group", {
        Grp_SrNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        TRNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        GroupName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        GroupUnder: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        GroupCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Fox_GStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // grp_prn_order: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Group;
};

// [BEST].[dbo].[Mast_Group]