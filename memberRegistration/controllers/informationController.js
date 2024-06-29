const memberInformationService = require('../services/informationService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");


exports.basicDetailsCreate = async (req, res, next) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const memberData = req.body;
        const EntryNo = await procedureStoreController.generateGroupUniqueCode(
            "member_information_EntryNo",
            "MEM",
            transaction
        );
        console.log(EntryNo);
        const mem_SrNo = await procedureStoreController.createRecordWithSrNo("member_information_mem_SrNo", transaction);
        // console.log(mem_SrNo);

        const newMember = await memberInformationService.createMember({ ...memberData, EntryNo, mem_SrNo });
        await transaction.commit();

        res.status(201).json({ message: 'Member created successfully', result: newMember });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(error);
        next(error);
    }
};

exports.basicDetailsGet = async (req, res, next) => {
    try {
        const { id } = req.params;
        const member = await memberInformationService.basicDetailsGet(id);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json({ message: 'Member fetched successfully', data: member });
    } catch (error) {
        next(error);
    }
};

exports.basicDetailsUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const memberData = req.body;
        const updatedMember = await memberInformationService.updateMember(id, memberData);
        res.status(201).json({ message: 'Member created successfully', result: updatedMember });
    } catch (error) {
        next(error);
    }
};

// ______________________________________________________________________________________________________________________________________________

exports.personalInfoUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const memberData = req.body;
        const updatedMember = await memberInformationService.updateMember(id, memberData);
        res.status(201).json({ message: 'Member created successfully', result: updatedMember });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.personalInfoGet = async (req, res, next) => {
    try {
        const { id } = req.params;
        const member = await memberInformationService.personalInfoGet(id);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json({ message: 'Member fetched successfully', data: member });
    } catch (error) {
        next(error);
    }
};

exports.getMemberById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const member = await memberInformationService.getMemberById(id);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json({ message: 'Member fetched successfully', data: member });
    } catch (error) {
        next(error);
    }
};

exports.getAllMembers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await memberInformationService.getAllMembers(page, limit);

        res.status(200).json({
            message: 'Members fetched successfully',
            currentPage: page,
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            data: result.rows
        });
    } catch (error) {
        next(error);
    }
};

exports.updateMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const memberData = req.body;
        const updatedMember = await memberInformationService.updateMember(id, memberData);
        if (!updatedMember) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json({ message: 'Member updated successfully', data: updatedMember });
    } catch (error) {
        next(error);
    }
};

exports.deleteMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await memberInformationService.deleteMember(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error) {
        next(error);
    }
};
