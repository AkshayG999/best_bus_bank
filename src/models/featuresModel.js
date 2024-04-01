const { DataTypes } = require('sequelize')

function featuresModel(sequelize) {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parentFeatureId: {
            type: DataTypes.STRING,
            allowNull: true
        }

    };
    const options = {
        freezeTableName: true,
        timestamps: true
    };

    return sequelize.define('featuresModel', attributes, options);
}

module.exports = featuresModel