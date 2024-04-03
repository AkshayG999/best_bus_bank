const groupService = require("../services/groupService");
const { findById } = require("../services/parentGroupService");
const { generateUniqueCode, createRecord } = require("../helper/helper");


const generateTrNo = async (code_prefix) => {
    const query = `
        DECLARE
            year_part TEXT;
            month_part TEXT;
            new_month BOOLEAN;
            increment INT;
            padded_increment TEXT;
            trno TEXT;
        BEGIN
            year_part := to_char(current_date, 'YY');
            month_part := to_char(current_date, 'MM');
            
            -- Check if it's a new month
            SELECT CASE WHEN month_part <> readMonthFromFile() THEN true ELSE false END INTO new_month;
            
            IF new_month THEN
                increment := 1; -- Reset increment if it's a new month
                writeMonthToFile(month_part);
            ELSE
                increment := readIncrementFromFile() + 1;
            END IF;
            
            writeIncrementToFile(increment);
            
            -- Pad the increment with leading zeros
            padded_increment := LPAD(increment::TEXT, 6, '0');
            
            -- Generate TRNo
            trno := code_prefix || year_part || month_part || '-' || padded_increment;
            
            RETURN trno;
        END;
    `;

    // Execute the stored procedure
    const result = await sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    
    // Assuming your stored procedure returns the TRNo directly
    return result[0][0].trno;
};

const createGroup = async (req, res) => {

    try {
        let { groupName, parentGroupId } = req.body;
        const createdBy = req.systemID;

        const findParentGroup = await findById(parentGroupId);
        // if (!findParentGroup) {
        //     return res.status(400).send({ success: false, message: "Parent Group Id Incorrect" });
        // }
        // TRNo create function
        const TRNo = await generateTrNo('BR');
        console.log(TRNo);

        // srNo
        const grp_srNo = await createRecord();
        console.log(grp_srNo);

        groupName = groupName.toUpperCase();
        const createNewGroup = await groupService.createGroup({ TRNo, groupName, parentGroupId, grp_srNo, createdBy });

        return res.status(201).json(createNewGroup);

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