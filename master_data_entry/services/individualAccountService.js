const { individualAccountModel, groupModel } = require('../../db/db');



exports.create = async (data, transaction) => {
    try {
        // console.log(data)
        const individualAccount = await individualAccountModel.create(data, { transaction });
        return individualAccount;
    } catch (error) {
        throw error;
    }
}
exports.findByTrNo = async (AccSrNo, populate = false) => {
    try {
        const individualAccount = await individualAccountModel.findOne({
            where: { AccSrNo: AccSrNo },
            include: populate ? [{ model: groupModel, attributes: ['sr_no', 'tr_no', 'groupName'] }] : []
        });
        return individualAccount;
    } catch (error) {
        throw error;
    }
}

exports.getAll = async (filter, populate = false) => {
    try {
        return await individualAccountModel.findAll({
            where: filter,
            include: populate ? [{ model: groupModel, as: 'group' }] : []

        });
    } catch (error) {
        throw error;
    }
}


exports.update = async (AccSrNo, dataForUpdate, transaction) => {
    try {
        const result = await individualAccountModel.update(dataForUpdate, { where: { AccSrNo: AccSrNo }, returning: true }, { transaction });
        if (result[0] === 0) {
            throw new Error(`No record found with AccSrNo ${AccSrNo}.`);
        }
        return result[1];

    } catch (error) {
        throw error;
    }
}

exports.delete = async (AccSrNo, transaction) => {
    try {
        return await individualAccountModel.destroy({ where: { AccSrNo: AccSrNo } }, { transaction });
    } catch (error) {
        throw error;
    }
}

