const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        TrNo: {
            type: DataTypes.CHAR(20),
            allowNull: false,
            primaryKey: true
        },
        TrDt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        BankCode: {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        BankName: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        Remarks: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        BKH_SrNo: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        }
    };
    const options = {
        freezeTableName: true,
        timestamps: false, // Set to false as timestamps are not defined in the data
    };

    return sequelize.define("bank", attributes, options);
};
