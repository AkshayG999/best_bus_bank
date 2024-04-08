const personService = require("../../userServices/services/userService");



// Update User Role 
const updateUserRole = async (req, res) => {
    try {

        const { systemID, role } = req.body;
        const existingPerson = await personService.findPersonBySystemID(systemID);
        console.log(existingPerson);

        if (!existingPerson) {
            return res
                .status(404)
                .json({ statusCode: 404, error: "User Does not exist" });
        }

        const updatedPerson = await personService.updatePersonRole(systemID, role);
        console.log(updatedPerson);
        return res.status(200).send({ success: true, message: "Role updated Successfully", updatedPerson });

    } catch (error) {
        return res.status(500).json({ statusCode: 500, error: error });
    }
}

const departmentAllocation = async (req, res) => {
    try {

        const { systemID, bankId, branchId, departmentId, role } = req.body;

        const existingPerson = await personService.findPersonBySystemID(systemID);
        console.log(existingPerson);

        if (!existingPerson) {
            return res
                .status(404)
                .json({ statusCode: 404, error: "User Does not exist" });
        }

        const updatedPerson = await personService.updateDepartmentAllocation(systemID, bankId, branchId, departmentId, role);
        return res.status(200).send({ success: true, message: "Department Allocation updated Successfully", updatedPerson });

    } catch (error) {
        return res.status(500).json({ statusCode: 500, error: error });
    }
}

module.exports = { updateUserRole, departmentAllocation }