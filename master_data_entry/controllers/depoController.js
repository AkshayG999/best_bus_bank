const depoService = require("../services/depoService");
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");
const AuditLogRepository = require("../../auditServices/auditLogService");
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");

exports.createDepo = async (req, res, next) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { DepoName } = req.body;
        let data = {};

        const SRNo = await procedureStoreController.createRecordWithSrNo(
            "Depo_SRNo",
            transaction
        );
        data.SRNo = SRNo;
        data.DepoCode = SRNo;
        data.DepoName = DepoName.toUpperCase();

        const depo = await depoService.createDepo(data, transaction);

        const log = await AuditLogRepository.log({ SystemID: req.systemID, entityName: "depo", entityId: depo.SRNo, action: "CREATE", afterAction: depo }, transaction);
        // console.log(log);

        await transaction.commit();
        return res
            .status(201)
            .send({
                success: true,
                message: "Depo created successfully",
                result: depo,
            });
    } catch (error) {
        // console.log(error)
        if (transaction) {
            await transaction.rollback();
        }
        next(error);
    }
};

exports.getAllDepos = async (req, res, next) => {
    try {
        const depos = await depoService.getAllDepos();
        return res
            .status(200)
            .send({
                success: true,
                message: "Depo fetched successfully",
                result: depos,
            });
    } catch (error) {
        next(error);
    }
};

exports.getDepoById = async (req, res, next) => {
    try {
        const depo = await depoService.getDepoById(req.params.SRNo);
        if (!depo) {
            return next({ status: 404, message: "Depo not found" });
        }
        return res
            .status(200)
            .send({
                success: true,
                message: "Depo fetched successfully",
                result: depo,
            });
    } catch (error) {
        next(error);
    }
};

exports.updateDepo = async (req, res, next) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { DepoName } = req.body;
        const SRNo = parseInt(req.params.SRNo, 10);
        const dataForUpdate = { DepoName: DepoName.toUpperCase() };

        const depo = await depoService.getDepoById(SRNo);
        if (!depo) {
            return next({ status: 404, message: "Depo not found" });
        }

        const updatedDepo = await depoService.updateDepo(SRNo, dataForUpdate, { transaction });
        if (!updatedDepo) {
            return next({ status: 404, message: "Depo not found after update" });
        }

        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "depo",
            entityId: SRNo,
            action: "UPDATE",
            beforeAction: depo,
            afterAction: updatedDepo,
        }, transaction);
        // console.log(log);

        await transaction.commit();

        return res.status(200).send({ success: true, message: "Depo updated successfully", result: updatedDepo });

    } catch (error) {
        next(error);
    }
};

exports.deleteDepo = async (req, res, next) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { SRNo } = req.req.params.SRNo;
        const depo = await depoService.getDepoById(SRNo);
        if (!depo) {
            return next({ status: 404, message: "Depo not found" });
        }

        const result = await depoService.deleteDepo(SRNo, transaction);
        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "depo",
            entityId: SRNo,
            action: "DELETE",
            beforeAction: depo,
        }, transaction);

        await transaction.commit();
        return res.status(200).send({ success: true, message: "Depo deleted successfully", result: result });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        next(error);
    }
};
