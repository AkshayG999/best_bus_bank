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


exports.getAllGroups = async (filter) => {
    try {

        const groups = await groupModel.findAll({
            where: filter,

            // { include: [{ model: parentGroupModel, as: 'parent_group', attributes: ['id', 'name'] }] }
        })
        // console.log(groups);
        return groups;
    } catch (error) {
        console.error('Error fetching group data:', error);
    }
};


exports.findByGrp_srNo = async (sr_no) => {
    return await groupModel.findOne({
        where: {
            sr_no: sr_no
        }
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