const { memberStatusModel } = require('../../db/db');  

class StatusService {
    async getAllStatuses() {
        return await memberStatusModel.findAll();
    }

    async getStatusById(id) {
        return await memberStatusModel.findByPk(id);
    }

    async createStatus(data) {
        return await memberStatusModel.create(data);
    }

    async updateStatus(id, data) {
        const status = await memberStatusModel.findByPk(id);
        if (!status) {
            throw new Error('Status not found');
        }
        return await status.update(data);
    }

    async deleteStatus(id) {
        const status = await memberStatusModel.findByPk(id);
        if (!status) {
            throw new Error('Status not found');
        }
        return await status.destroy();
    }
}

module.exports = new StatusService();
