const { db, sequelize, groupModel, parentGroupModel } = require("../../db/db");



exports.createGroup = async (data, transaction) => {
    try {
        const newGroup = await groupModel.create(data, { transaction });
        return newGroup;
    }
    catch (err) {
        await transaction.rollback();
        return err;
    }
};



exports.getAllGroups = async (filter, populate = false) => {
    try {
        const groups = await groupModel.findAll({
            where: filter,
            include: populate ? [{ model: parentGroupModel, attributes: ['sr_no', 'name'] }] : []
        });
        return groups;
    } catch (error) {
        console.error('Error fetching group data:', error);
    }
};



exports.findBySrNo = async (sr_no, populate = false) => {
    return await groupModel.findOne({
        where: { sr_no: sr_no },
        include: populate ? [{ model: parentGroupModel, attributes: ['sr_no', 'name'] }] : []

    });
};

exports.updateGroup = async (sr_no, data) => {
    return await groupModel.update(data, {
        where: {
            sr_no: sr_no
        }
    });
}


exports.deleteGroup = async (sr_no) => {

    return await groupModel.destroy({
        where: {
            sr_no: sr_no
        }
    })
}