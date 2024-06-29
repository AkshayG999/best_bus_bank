const { memberShipTypeModel } = require('../../db/db');  

class StatusService {
    async getAllStatuses() {
        return await memberShipTypeModel.findAll();
    }

    async getStatusById(id) {
        return await memberShipTypeModel.findByPk(id);
    }

    async createStatus(data) {
        return await memberShipTypeModel.create(data);
    }

    async updateStatus(id, data) {
        const status = await memberShipTypeModel.findByPk(id);
        if (!status) {
            throw new Error('Status not found');
        }
        return await status.update(data);
    }

    async deleteStatus(id) {
        const status = await memberShipTypeModel.findByPk(id);
        if (!status) {
            throw new Error('Status not found');
        }
        return await status.destroy();
    }
}

module.exports = new StatusService();
