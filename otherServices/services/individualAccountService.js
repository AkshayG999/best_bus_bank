const { individualAccountModel, groupModel } = require('../../db/db');



exports.createIndividualAccount = async (data) => {
    try {
        // console.log(data)
        const individualAccount = await individualAccountModel.create(data);
        return individualAccount;
    } catch (error) {
        throw error;
    }
}
exports.findByTrNo = async (TrNo, populate = false) => {
    try {
        const individualAccount = await individualAccountModel.findOne({
            where: { TrNo: TrNo },
            include: populate ? [{ model: groupModel, attributes: ['sr_no', 'tr_no', 'groupName'] }] : []
        });
        return individualAccount;
    } catch (error) {
        throw error;
    }
}

exports.getIndividualAccounts = async (filter, populate = false) => {
    try {
        return await individualAccountModel.findAll({
            where: filter,
            // include: populate ? [{ model: groupModel, }] : []
        });
    } catch (error) {
        throw error;
    }
}


exports.updateIndividualAccount = async (TrNo, dataForUpdate) => {
    try {
        await individualAccountModel.update(dataForUpdate, { where: { TrNo: TrNo } });
        const updatedIndividualAccount = await individualAccountModel.findByPk(TrNo);
        return updatedIndividualAccount;
    } catch (error) {
        throw error;
    }
}

exports.deleteIndividualAccount = async (TrNo) => {
    try {
        await individualAccountModel.destroy({ where: { TrNo: TrNo } });
    } catch (error) {
        throw error;
    }
}

