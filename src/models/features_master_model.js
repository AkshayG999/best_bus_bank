const { DataTypes, Sequelize } = require('sequelize');


const features_model_master = (sequelize) => {
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

    const FeatureMaster = sequelize.define('features_master', attributes, options);

    return FeatureMaster;
};


module.exports = { features_model_master };
