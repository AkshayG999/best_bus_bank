const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {
    return sequelize.define('member_nominee', {
        EntryNo: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        Mem_EntryNo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NomineeName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Nom_Rel: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NomAdd: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        NomAdd_Pincode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NominationDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        Nom_Perc: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        Nom_Age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        BehalfNominee: {
            type: DataTypes.STRING,
            allowNull: true
        },
        BehalfNominee_Add: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        BehalfNominee_Add_Pincode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Nom_Gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Rel_Text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SrNo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        mno: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'member_nominee',
        timestamps: false
    });
}
