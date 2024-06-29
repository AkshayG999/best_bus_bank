const { DataTypes } = require("sequelize");


module.exports = function (sequelize) {
    const auditLog = sequelize.define(
        'auditLog',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            SystemID: {
                type: DataTypes.STRING,  // Which user take this Action
                allowNull: true,
            },
            entityName: {
                type: DataTypes.STRING(255),  // Table Name
                allowNull: false,
                validate: {
                    len: [0, 255],
                },
            },
            entityId: {
                type: DataTypes.STRING(255),  // table ID/SrNo
                allowNull: false,
                validate: {
                    len: [0, 255],
                },
            },
            action: {
                type: DataTypes.STRING(32),  // Action type CREATE UPDATE DELETE
                allowNull: false,
                validate: {
                    len: [0, 32],
                },
            },
            beforeAction: {
                type: DataTypes.JSONB,  // If Update and delete then store before
                allowNull: true,
            },
            afterAction: {
                type: DataTypes.JSONB,  // After Action what changes made
                allowNull: true,
            },
            timestamp: { type: DataTypes.DATE, allowNull: false },
        },
        {
            timestamps: false,
        },
    );

    auditLog.associate = (models) => { };

    return auditLog;
}