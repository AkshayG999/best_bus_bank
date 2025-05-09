const { db, sequelize, groupModel, parentGroupModel } = require("../../db/db");



exports.createGroup = async (data, transaction) => {
    try {
        const newGroup = await groupModel.create(data, { transaction });
        return newGroup;
    }
    catch (err) {
        throw err;
    }
};



exports.getAllGroups = async (filter, populate = false) => {
    try {
        const groups = await groupModel.findAll({
            where: filter,
            include: populate ? [{
                model: parentGroupModel, as: 'parent_group',
                attributes: ['sr_no', 'name']
            }] : []
        });
        return groups;
    } catch (error) {
        console.error('Error fetching group data:', error);
        throw error;
    }
};



exports.findBySrNo = async (Grp_SrNo, populate = false) => {
    try {
        return await groupModel.findOne({
            where: { Grp_SrNo: Grp_SrNo },
            include: populate ? [{ model: parentGroupModel, attributes: ['sr_no', 'name'] }] : []

        });
    } catch (error) {
        throw error;
    }
};

exports.updateGroup = async (Grp_SrNo, data, transaction) => {
    try {
        const result = await groupModel.update(data, {
            where: { Grp_SrNo: Grp_SrNo }, returning: true,
        }, { transaction });

        if (result[0] === 0) {
            throw new Error(`No record found with Grp_SrNo ${Grp_SrNo}.`);
        }
        return result[1];

    } catch (error) {
        throw error;
    }
}


exports.deleteGroup = async (Grp_SrNo, transaction) => {
    try {
        return await groupModel.destroy({
            where: {
                Grp_SrNo: Grp_SrNo
            }
        }, { transaction })
    } catch (error) {
        throw error;
    }
}