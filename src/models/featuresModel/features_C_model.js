const { DataTypes } = require("sequelize");

// Define feature model C
const features_model_C = (sequelize) => {
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

    const FeatureC = sequelize.define('features_C', attributes, options);

    // FeatureC.belongsTo(features_B, { foreignKey: 'features_B_ID', as: 'feature_B' });

    return FeatureC;
};

module.exports = { features_model_C };