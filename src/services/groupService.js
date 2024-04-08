const { db, sequelize, groupModel, parentGroupModel } = require("../../db/db");



const createGroup = async (data, transaction) => {
    try {
        const newGroup = await groupModel.create(data, { transaction });
        return newGroup;
    }
    catch (err) {
        await transaction.rollback();
        return err;
    }
};


const findByGrp_srNo = async (sr_no) => {
    return await groupModel.findOne({
        where: {
            sr_no: sr_no
        }
    });
};


const getAllGroups = async () => {
    try {

        const groups = await groupModel.findAll(
            // { include: [{ model: parentGroupModel, as: 'parent_group', attributes: ['id', 'name'] }] }
        )
        // console.log(groups);
        return groups;
    } catch (error) {
        console.error('Error fetching group data:', error);
    }
};



module.exports = { createGroup, findByGrp_srNo, getAllGroups }