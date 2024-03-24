const { DataTypes } = require("sequelize");


function roleModel(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => {
                const timestamp = new Date().getTime().toString(16);
                const randomChars = Math.random().toString(36).substring(2, 8);
                return `${timestamp}${randomChars}`;
            }
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
    };

    return sequelize.define("roles", attributes, options);
}

module.exports = roleModel;