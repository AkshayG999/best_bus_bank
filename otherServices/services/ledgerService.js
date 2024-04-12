const { ledgerModel, groupModel } = require('../../db/db');



exports.createLedger = async (data) => {
    try {
        console.log(data)
        const ledger = await ledgerModel.create(data);
        return ledger;
    } catch (error) {
        throw error;
    }
}
exports.findBySrNo = async (sr_no, populate = false) => {
    try {
        const ledger = await ledgerModel.findOne({
            where: { sr_no: sr_no },
            include: populate ? [{ model: groupModel, attributes: ['sr_no', 'tr_no', 'groupName'] }] : []
        });
        return ledger;
    } catch (error) {
        throw error;
    }
}

exports.getLedgers = async (filter, populate = false) => {
    try {
        return await ledgerModel.findAll({
            where: filter,
            include: populate ? [{ model: groupModel, attributes: ['sr_no', 'tr_no', 'groupName'] }] : []
        });
    } catch (error) {
        throw error;
    }
}


exports.updateLedger = async (sr_no, dataForUpdate) => {
    try {
        await ledgerModel.update(dataForUpdate, { where: { sr_no: sr_no } });
        const updatedLedger = await ledgerModel.findByPk(sr_no);
        return updatedLedger;
    } catch (error) {
        throw error;
    }
}

exports.deleteLedger = async (sr_no) => {
    try {
        await ledgerModel.destroy({ where: { sr_no: sr_no } });
    } catch (error) {
        throw error;
    }
}

