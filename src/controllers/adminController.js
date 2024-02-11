const personService = require("../services/userService");



// Update User Role 
const updateUserRole = async (req, res) => {
    try {

        const { systemID, role } = req.body;
        const exisitingPerson = await personService.findPersonBySystemID(systemID);
        console.log(exisitingPerson);

        if (!exisitingPerson) {
            return res
                .status(404)
                .json({ statusCode: 404, error: "Person Does not exist" });
        }

        const updatedPerson = await personService.updatePersonRole(systemID, role);
        return res.status(200).send({ success: true, message: "Role updated Successfully", updatedPerson });

    } catch (error) {
        return res.status(500).json({ statusCode: 500, error: error });
    }
}

module.exports = { updateUserRole }