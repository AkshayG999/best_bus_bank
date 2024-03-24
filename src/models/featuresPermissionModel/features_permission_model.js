const { DataTypes } = require('sequelize')

function features_master_permission_model(sequelize) {
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
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        write: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
    const options = {
        freezeTableName: true,
        timestamps: true,
    }

    return sequelize.define('features_master_permission', attributes, options);
}
function features_A_permission_model(sequelize) {
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
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        write: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
    const options = {
        freezeTableName: true,
        timestamps: true,
    }

    return sequelize.define('features_A_permission', attributes, options);
}

function features_B_permission_model(sequelize) {
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
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        write: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
    const options = {
        freezeTableName: true,
        timestamps: true,
    }

    return sequelize.define('features_B_permission', attributes, options);
}

function features_C_permission_model(sequelize) {
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
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        write: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
    const options = {
        freezeTableName: true,
        timestamps: true,
    }

    return sequelize.define('features_C_permission', attributes, options);
}

module.exports = {
    features_master_permission_model,
    features_A_permission_model,
    features_B_permission_model,
    features_C_permission_model
}
