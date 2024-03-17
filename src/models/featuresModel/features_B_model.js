const { DataTypes } = require("sequelize");

// Define feature model B
const features_model_B = (sequelize) => {
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
        }
    };
    const options = {
        freezeTableName: true,
        timestamps: true
    };

    const FeatureB = sequelize.define('features_B', attributes, options);

    // FeatureB.belongsTo(features_A, { foreignKey: 'features_A_ID', as: 'feature_A' });

    return FeatureB;
};

module.exports = { features_model_B };