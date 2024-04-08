const parentGroupService = require("../services/parentGroupService");



const createParentGroup = async (req, res) => {

    try {
        const { id, name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const createNewParentGroup = await parentGroupService.createParentGroup({ name })
        return res.status(201).send({ success: true, message: 'Parent group created successfully', result: createNewParentGroup });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: error });
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