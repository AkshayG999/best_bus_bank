const { depoModel } = require('../../db/db');

exports.createDepo = async (depoData, transaction) => {
    try {
        return await depoModel.create(depoData, { transaction });
    } catch (error) {
        throw error;
    }
};

exports.getAllDepos = async () => {
    try {
        return await depoModel.findAll();
    } catch (error) {
        throw error;
    }
};

exports.getDepoById = async (SRNo) => {
    try {
        return await depoModel.findByPk(SRNo);
    } catch (error) {
        throw error;
    }
};

exports.updateDepo = async (SRNo, depoData) => {
    try {
        const depo = await depoModel.findByPk(SRNo);
        if (depo) {
            return await depo.update(depoData);
        }
        return null;
    } catch (error) {
        throw error;
    }
};

exports.deleteDepo = async (SRNo) => {
    try {
        const depo = await depoModel.findByPk(SRNo);
        if (depo) {
            return await depo.destroy();
        }
        return null;
    } catch (error) {
        throw error;
    }
};