const validator = require('validator');
const { v4: uuid } = require('uuid');
const Sequelize = require('sequelize');

class SequelizeFilterUtils {
    static uuid(value) {
        let id = value;

        if (!validator.isUUID(id)) {
            id = uuid();
        }

        return id;
    }

    static ilikeIncludes(model, column, value) {
        return Sequelize.where(
            Sequelize.fn(
                'lower',
                Sequelize.col(`${model}.${column}`),
            ),
            {
                [Sequelize.Op.like]: `%${value}%`.toLowerCase(),
            },
        );
    }

    static ilikeExact(model, column, value) {
        return Sequelize.where(
            Sequelize.fn(
                'lower',
                Sequelize.col(`${model}.${column}`),
            ),
            {
                [Sequelize.Op.like]: (value || '').toLowerCase(),
            },
        );
    }
}

module.exports = SequelizeFilterUtils;