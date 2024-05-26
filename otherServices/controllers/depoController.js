const depoService = require("../services/depoService");
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");

exports.createDepo = async (req, res, next) => {
    let transaction;
    try {
        const { DepoName } = req.body;
        let data = {};

        transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });

        const SRNo = await procedureStoreController.createRecordWithSrNo(
            "Depo_SRNo",
            transaction
        );
        data.SRNo = SRNo;
        data.DepoCode = SRNo;
        data.DepoName = DepoName.toUpperCase();

        const depo = await depoService.createDepo(data, transaction);
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
    try {
        const { DepoName } = req.body;

        const dataForUpdate = { DepoName: DepoName.toUpperCase() };

        const updatedDepo = await depoService.updateDepo(
            req.params.SRNo,
            dataForUpdate
        );
        if (updatedDepo) {
            res.status(200).json(updatedDepo);
        } else {
            res.status(404).json({ error: "Depo not found" });
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteDepo = async (req, res, next) => {
    try {
        const result = await depoService.deleteDepo(req.params.SRNo);
        if (result) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: "Depo not found" });
        }
    } catch (error) {
        next(error);
    }
};
