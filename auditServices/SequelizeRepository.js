const lodash = require('lodash');
const { UniqueConstraintError } = require('sequelize');

class SequelizeRepository {
    static async cleanDatabase(database) {
        if (process.env.NODE_ENV !== 'test') {
            throw new Error(
                'Clean database only allowed for test!',
            );
        }

        await database.sequelize.sync({ force: true });
    }

    static getCurrentUser(options) {
        return (options && options.currentUser) || { id: null };
    }

    static getCurrentTenant(options) {
        return (
            (options && options.currentTenant) || { id: null }
        );
    }

    static getTransaction(options) {
        return (options && options.transaction) || undefined;
    }

    static async createTransaction(database) {
        return database.sequelize.transaction();
    }

    static async commitTransaction(transaction) {
        return transaction.commit();
    }

    static async rollbackTransaction(transaction) {
        return transaction.rollback();
    }

    static handleUniqueFieldError(error, language, entityName) {
        if (!(error instanceof UniqueConstraintError)) {
            return;
        }

        const fieldName = lodash.get(error, 'errors[0].path');
        throw new Error400(
            language,
            `entities.${entityName}.errors.unique.${fieldName}`,
        );
    }
}

module.exports = SequelizeRepository;
