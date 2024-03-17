const { DataTypes } = require("sequelize");


// Define feature model A
const features_model_A = (sequelize) => {
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

    const FeatureA = sequelize.define('features_A', attributes, options);

    // FeatureA.belongsTo(features_master, { foreignKey: 'feature_master_ID', as: 'features_master' });  

    return FeatureA;
};

module.exports = { features_model_A };