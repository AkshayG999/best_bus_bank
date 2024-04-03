const parentGroupService = require("../services/parentGroupService");



const createParentGroup = async (req, res) => {

    try {
        const { id, name } = req.body;

        const createNewParentGroup = await parentGroupService.createParentGroup({ id, name })
        return res.status(201).json(createNewParentGroup);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
    }
}


const getAllParentGroups = async (req, res) => {

    try {

        const getAllGroups = await parentGroupService.getAll();
        return res.status(200).json(getAllGroups);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
    }
}


module.exports = { createParentGroup, getAllParentGroups };