const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {

    return sequelize.define('member_address', {
        EntryNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Resi_Add_01: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_02: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_Area: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_City: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_State: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_Pincode: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_TelNo: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_01: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_02: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_Area: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_City: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_State: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_Pincode: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_TelNo: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_01_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_02_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_Area_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_City_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_State_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_Pincode_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Resi_Add_TelNo_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_01_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_02_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_Area_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_City_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_State_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_Pincode_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Perm_Add_TelNo_Mar: {
            type: DataTypes.STRING(500),
            allowNull: true
        }
    }, {
        tableName: 'member_address',
        timestamps: false
    });

}
