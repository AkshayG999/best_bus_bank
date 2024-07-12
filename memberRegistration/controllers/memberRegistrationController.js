const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");
const memberInformationService = require('../services/informationService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");
const { basicDetailsCreate, personalInfoUpdate } = require("./informationController");

exports.createMember = async (req, res, next) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });

    try {
        let { basicDetails, personalInfo, address, bankDetails, document, nominee, installment } = req.body;

        // Create basic details
        const newMember = await basicDetailsCreate(basicDetails, transaction);

        // Create personal info
        await personalInfoUpdate(personalInfo, transaction);

        // Create address
        await memberInformationService.createAddress(newMember.id, address, transaction);

        // Create bank details
        await memberInformationService.createBankDetails(newMember.id, bankDetails, transaction);

        // Create document
        await memberInformationService.createDocument(newMember.id, document, transaction);

        // Create nominee
        await memberInformationService.createNominee(newMember.id, nominee, transaction);

        // Create installment
        await memberInformationService.createInstallment(newMember.id, installment, transaction);

        // Commit transaction
        await transaction.commit();
        res.status(201).json({ message: "Member created successfully", memberId: newMember.id });
    } catch (error) {
        if (transaction) await transaction.rollback();
        next(error);
    }
};
