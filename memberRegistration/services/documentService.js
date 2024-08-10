const { where } = require('sequelize');
const { memberDocumentModel } = require('../../db/db');


exports.create = async (data, transaction = null) => {
    try {
        const options = transaction ? { transaction } : {};
        return await memberDocumentModel.create(data, options);
    } catch (error) {
        throw new Error(`Failed to create member document: ${error.message}`);
    }
};

exports.getAll = async (filter = {}) => {
    try {
        return await memberDocumentModel.findAll({ where: filter });
    } catch (error) {
        throw new Error(`Failed to fetch member documents: ${error.message}`);
    }
};

exports.getByEntryNo = async (EntryNo) => {
    try {
        const document = await memberDocumentModel.findOne({ where: { EntryNo } });
        // if (!document) throw new Error(`Document with EntryNo ${EntryNo} not found`);
        return document;
    } catch (error) {
        throw new Error(`Failed to fetch member document: ${error.message}`);
    }
};
exports.getById = async (EntryNo) => {
    try {
        const document = await memberDocumentModel.findByPk(EntryNo);
        if (!document) throw new Error(`Document with EntryNo ${EntryNo} not found`);
        return document;
    } catch (error) {
        throw new Error(`Failed to fetch member document: ${error.message}`);
    }
};

exports.update = async (EntryNo, updateData, transaction = null) => {
    try {
        const options = transaction ? { transaction } : {};
        const [rowsUpdate, [updatedData]] = await memberDocumentModel.update(updateData, {
            where: { EntryNo },
            returning: true,
            ...options
        });

        if (rowsUpdate === 0) throw new Error(`No document found with EntryNo ${EntryNo}`);

        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update member document: ${error.message}`);
    }
};

exports.delete = async (EntryNo, transaction = null) => {
    try {
        const options = transaction ? { transaction } : {};
        const deleted = await memberDocumentModel.destroy({
            where: { EntryNo },
            ...options
        });

        if (deleted === 0)// throw new Error(`No document found with EntryNo ${EntryNo}`);
        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete member document: ${error.message}`);
    }
};
