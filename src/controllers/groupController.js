const groupService = require("../services/groupService");
const { findById } = require("../services/parentGroupService");
const { generateUniqueCode, createRecord } = require("../helper/helper");
const { generateGroupUniqueCode, createRecordWithSrNo, procedure_store_model } = require("../storeprocedures/groupStoreProcedure");



const createGroup = async (req, res) => {

    try {
        let { groupName, parentGroupId } = req.body;
        const createdBy = req.systemID;

        const findParentGroup = await findById(parentGroupId);
        // if (!findParentGroup) {
        //     return res.status(400).send({ success: false, message: "Parent Group Id Incorrect" });
        // }

        // TRNo create function
        const tr_no = await generateGroupUniqueCode('group_tr_no', 'BR');
        // console.log(tr_no);

        // srNo
        const sr_no = await createRecordWithSrNo('group_sr_no');
        // console.log(grp_srNo);

        // return res.status(201).json({ grp_srNo, tr_no });

        groupName = groupName.toUpperCase();
        const createNewGroup = await groupService.createGroup({ sr_no, tr_no, groupName, parentGroupId, createdBy });

        return res.status(201).json({ createNewGroup });

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