const Sequelize = require('sequelize');
const SequelizeRepository = require('./SequelizeRepository');
const SequelizeFilterUtils = require('./SequelizeFilterUtils');
const { auditLogModel } = require('../db/db');
const Op = Sequelize.Op;


class AuditLogRepository {
    static get CREATE() {
        return 'create';
    }

    static get UPDATE() {
        return 'update';
    }

    static get DELETE() {
        return 'delete';
    }

    /**
     * Saves an Audit Log to the database.
     *
     * @param  {Object} log - The log being saved.
     * @param  {string} log.entityName - The name of the entity. Ex.: customer
     * @param  {string} log.entityId - The id of the entity.
     * @param  {string} log.action - The action [create, update or delete].
     * @param  {Object} log.values - The JSON log value with data of the entity.
     *
     * @param  {Object} options
     * @param  {Object} options.transaction - The current database transaction.
     * @param  {Object} options.currentUser - The current logged user.
     * @param  {Object} options.currentTenant - The current currentTenant.
     */

    static async log({ SystemID, entityName, entityId, action, beforeAction, afterAction }, transaction) {
        // const transaction = SequelizeRepository.getTransaction(options);

        const log = await auditLogModel.create(
            {
                SystemID,
                entityName,
                entityId,
                action,
                beforeAction,
                afterAction,
                timestamp: new Date(),
            },
            { transaction }
        );

        return log;
    }

    static async findAndCountAll({ filter, limit = 0, offset = 0, orderBy = '' }, options) {
        const tenant = SequelizeRepository.getCurrentTenant(options);

        let whereAnd = [];
        let include = [];

        whereAnd.push({
            tenantId: tenant.id,
        });

        if (filter) {
            if (filter.timestampRange) {
                const [start, end] = filter.timestampRange;

                if (start !== undefined && start !== null && start !== '') {
                    whereAnd.push({
                        ['timestamp']: {
                            [Op.gte]: start,
                        },
                    });
                }

                if (end !== undefined && end !== null && end !== '') {
                    whereAnd.push({
                        ['timestamp']: {
                            [Op.lte]: end,
                        },
                    });
                }
            }

            if (filter.action) {
                whereAnd.push({
                    ['action']: filter.action,
                });
            }

            if (filter.entityId) {
                whereAnd.push({
                    ['entityId']: filter.entityId,
                });
            }

            if (filter.createdByEmail) {
                whereAnd.push({
                    [Op.and]: SequelizeFilterUtils.ilikeIncludes(
                        'auditLog',
                        'createdByEmail',
                        filter.createdByEmail
                    ),
                });
            }

            if (filter.entityNames && filter.entityNames.length) {
                whereAnd.push({
                    ['entityName']: {
                        [Op.in]: filter.entityNames,
                    },
                });
            }
        }

        const where = { [Op.and]: whereAnd };

        return auditLogModel.findAndCountAll({
            where,
            include,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order: orderBy ? [orderBy.split('_')] : [['timestamp', 'DESC']],
        });
    }
}

module.exports = AuditLogRepository;
