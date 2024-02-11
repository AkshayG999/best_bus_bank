const groupService = require("../services/groupService");
const { findById } = require("../services/parentGroupService");
const { generateUniqueCode, createRecord } = require("../helper/helper");



const createGroup = async (req, res) => {

    try {
        let { groupName, groupUnder } = req.body;
        const createdBy = req.systemID;

        const findParentGroup = await findById(groupUnder);
        if (!findParentGroup) {
            return res.status(400).send({ success: false, mesaage: "Parent Group Id Incorrect" });
        }
        // TRNo create function
        const TRNo = await generateUniqueCode('BR');
        console.log(TRNo);

        // srNo
        const grp_srNo = await createRecord();
        console.log(grp_srNo);

        groupName = groupName.toUpperCase();
        const createNewgroup = await groupService.createGroup({ TRNo, groupName, groupUnder, grp_srNo, createdBy });

        return res.status(201).json(createNewgroup);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: error });
    }
}


const getGroups = async (req, res) => {

    try {

        const getAllGroups = await groupService.getAllGroups();
        return res.status(200).json(getAllGroups);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
    }
}


module.exports = { createGroup, getGroups };