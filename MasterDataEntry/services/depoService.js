const { where } = require('sequelize');
const { depoModel } = require('../../db/db');

exports.createDepo = async (depoData, transaction) => {
    try {
        return await depoModel.create(depoData, { transaction });
    } catch (error) {
        throw error;
    }
};

exports.getAllDepos = async () => {
    try {
        return await depoModel.findAll();
    } catch (error) {
        throw error;
    }
};

exports.getDepoById = async (SRNo) => {
    try {
        return await depoModel.findByPk(SRNo);
    } catch (error) {
        throw error;
    }
};

exports.updateDepo = async (SRNo, depoData) => {
    try {

        if (typeof SRNo !== 'number' || SRNo <= 0) {
            throw new Error('Invalid SRNo provided. It should be a positive number.');
        }

        if (!depoData || typeof depoData !== 'object' || Array.isArray(depoData)) {
            throw new Error('Invalid depoData provided. It should be a non-null object.');
        }

        const filteredData = {};
        for (const key in depoData) {
            if (depoData[key] !== undefined && depoData[key] !== null) {
                filteredData[key] = depoData[key];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            throw new Error('No valid fields provided to update.');
        }

        // Perform the update
        const result = await depoModel.update(filteredData, {
            where: { SRNo: SRNo },
            returning: true, // To get the updated record
        });

        if (result[0] === 0) {
            throw new Error(`No record found with SRNo ${SRNo}.`);
        }
        return result[1]; // Returning the updated records

    } catch (error) {
        console.error('Error in updateDepo:', error.message);
        throw new Error(`Failed to update record: ${error.message}`);
    }
};


exports.deleteDepo = async (SRNo) => {
    try {
        const depo = await depoModel.findByPk(SRNo);
        if (depo) {
            return await depo.destroy();
        }
        return null;
    } catch (error) {
        throw error;
    }
};