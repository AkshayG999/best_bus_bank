const { db, sequelize, groupModel, parentGroupModel } = require("../config/db");



const createGroup = async ({ TRNo, groupName, groupUnder, grp_srNo, createdBy }) => {
    const newgroup = await groupModel.create({ TRNo, groupName, groupUnder, grp_srNo, createdBy });
    return newgroup;
};


const findByGrp_srNo = async (grp_srNo) => {
    return await groupModel.findOne({
        where: {
            grp_srNo: grp_srNo
        }
    });
};


const getAllGroups = async () => {
    try {

        const groups = await groupModel.findAll({ include: [{ model: parentGroupModel, as: 'parentgroup', attributes: ['id', 'name'] }] })
        console.log(groups);
        return groups;
    } catch (error) {
        console.error('Error fetching group data:', error);
    }
};



module.exports = { createGroup, findByGrp_srNo, getAllGroups }