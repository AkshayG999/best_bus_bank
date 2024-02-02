const { createParentgroup, getAll } = require("../services/parentGroupService");



const createParentGroup = async (req, res) => {

    try {
        const { id, name } = req.body;

        const createNewParentgroup = await createParentgroup({ id, name })
        return res.status(201).json(createNewParentgroup);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
    }
}


const getAllParentGroups = async (req, res) => {

    try {

        const getAllGroups = await getAll();
        return res.status(200).json(getAllGroups);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
    }
}


module.exports = { createParentGroup, getAllParentGroups };