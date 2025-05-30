const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");
const { basicDetailsCreate, basicDetailsGet, personalInfoGet, getMemberWithStat, updateMember, deleteMember, getMember } = require("./informationController");
const { createMemberAddress, getMemberAddressById, updateMemberAddress, deleteMemberAddress } = require("./addressController");
const { createBankInfo, getBankInfo, updateBankInfo, deleteBankInfo } = require("./bankInfoController");
const { createDocument, getDocumentByEntryNo, updateDocument, deleteDocument } = require("./documentController");
const { createNominee, getNomineeByMem_EntryNo, updateNominee, deleteNominee } = require("./nomineeController");
const { createInstallment, updateInstallment, getInstallment, deleteInstallment } = require("./installmentController");




exports.createMember = async (req, res, next) => {
    let transaction;

    try {
        transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });

        let { basicDetails, personalInfo, address, bankDetails, document, nominee, installment } = req.body;

        if (!basicDetails || !personalInfo || !address || !bankDetails || !document || !nominee || !installment) {
            return next({ status: 400, message: "All member details must be provided." });
        }

        // Create basic details
        const newMember = await basicDetailsCreate({ ...basicDetails, ...personalInfo }, transaction);
        if (newMember && newMember.error) {
            await transaction.rollback();
            return next({ status: 400, message: newMember.error });
        }

        if (!newMember) {
            await transaction.rollback();
            return next({ status: 500, message: "Failed to create basic details." });
        }

        const EntryNo = newMember.dataValues.EntryNo;
        const MNO = newMember.dataValues.mem_SrNo;
        const MemCode = newMember.dataValues.MemCode;

        // Create address
        const newAddress = await createMemberAddress({ EntryNo, ...address }, transaction);
        if (!newAddress) {
            await transaction.rollback();
            return next({ status: 400, message: "Failed to create address." });
        }

        // Create bank details
        const newBankInfo = await createBankInfo({ EntryNo, ...bankDetails }, transaction);
        if (!newBankInfo) {
            await transaction.rollback();
            return next({ status: 400, message: "Failed to create bank details." });
        }

        // Create document
        const newDocument = await createDocument({ EntryNo, ...document }, transaction);
        if (!newDocument) {
            await transaction.rollback();
            return next({ status: 400, message: "Failed to create document." });
        }

        // Create nominee
        const newNominee = await createNominee({ "Mem_EntryNo": EntryNo, "mno": MNO, ...nominee }, transaction);
        if (newNominee.error) {
            await transaction.rollback();
            return next({ status: 400, message: newNominee.error });
        }

        // Create installment
        const newInstallment = await createInstallment({ "MNO": MNO, "CHECKNO": MemCode, ...installment }, transaction);
        if (!newInstallment) {
            await transaction.rollback();
            return next({ status: 400, message: "Failed to create installment." });
        }

        // Commit transaction
        await transaction.commit();
        console.log("Transaction committed...");

        res.status(201).json({
            success: true,
            message: "Member created successfully",
            EntryNo: newMember.EntryNo,
            basicDetails: newMember,
            personalInfo: newMember,
            address: newAddress,
            bankDetails: newBankInfo,
            document: newDocument,
            nominee: newNominee,
            installment: newInstallment
        });
    } catch (error) {
        console.log("Transaction rollback...");
        if (transaction) {
            await transaction.rollback();
        }
        console.error(error);
        next({ status: 500, message: error.message });
    }
};


exports.getMemberInformations = async (req, res, next) => {
    try {
        const { EntryNo, mem_SrNo, MemCode } = req.query;

        if (EntryNo) {

            const basicDetails = await basicDetailsGet(EntryNo);
            if (!basicDetails) {
                return res.status(404).json({
                    success: false,
                    message: "Member not found",
                });
            }
            const MNO = basicDetails.dataValues.mem_SrNo;

            // const personalInfo = await personalInfoGet(EntryNo);

            const address = await getMemberAddressById(EntryNo);

            const bankDetails = await getBankInfo(EntryNo);

            const document = await getDocumentByEntryNo(EntryNo);

            const nominee = await getNomineeByMem_EntryNo(EntryNo);

            const installment = await getInstallment(MNO);

            return res.status(200).json({
                success: true,
                message: "Member fetch successfully",
                membersData: [{
                    member: basicDetails,
                    personalInfo: basicDetails,
                    address,
                    bankDetails,
                    document,
                    nominee,
                    installment
                }]
            });
        }
        else {
            let filter = {};

            if (mem_SrNo) filter.mem_SrNo = mem_SrNo;
            if (MemCode) filter.MemCode = MemCode;

            const basicDetails = await getMemberWithStat(filter);
            if (basicDetails.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Member not found",
                });
            }
            const membersData = await Promise.all(basicDetails.map(async (member) => {
                const EntryNo = member.dataValues.EntryNo;
                const MNO = member.dataValues.mem_SrNo;

                const personalInfo = await personalInfoGet(EntryNo);
                const address = await getMemberAddressById(EntryNo);
                const bankDetails = await getBankInfo(EntryNo);
                const document = await getDocumentByEntryNo(EntryNo);
                const nominee = await getNomineeByMem_EntryNo(EntryNo);
                const installment = await getInstallment(MNO);

                return {
                    member,
                    personalInfo,
                    address,
                    bankDetails,
                    document,
                    nominee,
                    installment
                };
            }));

            return res.status(200).json({
                success: true,
                message: "Member fetched successfully",
                membersData
            });
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateMember = async (req, res, next) => {
    let transaction;
    const { EntryNo, mem_SrNo } = req.params;
    let { basicDetails, personalInfo, address, bankDetails, document, nominee, installment } = req.body;

    try {
        transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });

        if (!basicDetails || !personalInfo || !address || !bankDetails || !document || !nominee || !installment) {
            return next({ status: 400, message: "All member details must be provided." });
        }

        // Update basic details
        const updatedBasicDetails = await updateMember(EntryNo, { ...basicDetails, ...personalInfo }, transaction);
        if (updatedBasicDetails && updatedBasicDetails.error) {
            await transaction.rollback();
            return next({ status: 400, message: updatedBasicDetails.error });
        }

        const MNO = updatedBasicDetails.dataValues.mem_SrNo;
        const MemCode = updatedBasicDetails.dataValues.MemCode;

        // Update address
        const updatedAddress = await updateMemberAddress(EntryNo, address, transaction);
        if (!updatedAddress) {
            await transaction.rollback();
            return next({ status: 400, message: "Failed to update address." });
        }

        // Update bank details
        const updatedBankInfo = await updateBankInfo(EntryNo, bankDetails, transaction);
        if (!updatedBankInfo) {
            await transaction.rollback();
            return next({ status: 400, message: "Failed to update bank details." });
        }

        // Update document
        const updatedDocument = await updateDocument(EntryNo, document, transaction);
        if (!updatedDocument) {
            await transaction.rollback();
            return next({ status: 400, message: "Failed to update document." });
        }

        // Update nominee
        const updatedNominee = await updateNominee(EntryNo, MNO, nominee, transaction);
        if (updatedNominee.error) {
            await transaction.rollback();
            return next({ status: 400, message: updatedNominee.error });
        }

        // Update installment
        const updatedInstallment = await updateInstallment(MNO, MemCode, installment, transaction);
        if (!updatedInstallment) {
            await transaction.rollback();
            return next({ status: 400, message: "Failed to update installment." });
        }

        // Commit transaction
        console.log("transaction committed...");
        await transaction.commit();

        res.status(200).json({
            success: true,
            message: "Member updated successfully",
            basicDetails: updatedBasicDetails,
            personalInfo: updatedBasicDetails,
            address: updatedAddress,
            bankDetails: updatedBankInfo,
            document: updatedDocument,
            nominee: updatedNominee,
            installment: updatedInstallment
        });
    } catch (error) {
        console.log("transaction rollback...");
        if (transaction) {
            await transaction.rollback();
        }
        console.log(error);
        next(error);
    }
};


exports.deleteMember = async (req, res, next) => {
    let transaction;
    const { EntryNo, mem_SrNo } = req.params;

    try {
        transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });

        // Delete basic details
        const deletedBasicDetails = await deleteMember(EntryNo, transaction);
        if (!deletedBasicDetails) throw new Error("Failed to delete basic details.");

        // Delete address
        const deletedAddress = await deleteMemberAddress(EntryNo, transaction);
        if (!deletedAddress) throw new Error("Failed to delete address.");

        // Delete bank details
        const deletedBankInfo = await deleteBankInfo(EntryNo, transaction);
        if (!deletedBankInfo) throw new Error("Failed to delete bank details.");

        // Delete document
        const deletedDocument = await deleteDocument(EntryNo, transaction);
        if (!deletedDocument) throw new Error("Failed to delete document.");

        // Delete nominee
        const deletedNominee = await deleteNominee(EntryNo, transaction);
        if (!deletedNominee) throw new Error("Failed to delete nominee.");

        // Delete installment
        const deletedInstallment = await deleteInstallment(mem_SrNo, transaction);
        if (!deletedInstallment) throw new Error("Failed to delete installment.");

        // Commit transaction
        console.log("Transaction committed...");
        await transaction.commit();

        res.status(200).json({
            success: true,
            message: "Member deleted successfully",
        });
    } catch (error) {
        console.log("Transaction rollback...");
        if (transaction) {
            await transaction.rollback();
        }
        console.log(error);
        next(error);
    }
};