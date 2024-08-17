const { ifscModel } = require('../../db/db');

class IFSCService {
    static async createIFSC(data) {
        return await ifscModel.create(data);
    }

    static async getIFSCByCode(ifscCode) {
        return await ifscModel.findOne({ where: { IFSC: ifscCode } });
    }

    static async getAllIFSCs() {
        return await ifscModel.findAll();
    }

    static async updateIFSC(ifscCode, data) {
        return await ifscModel.update(data, { where: { IFSC: ifscCode } });
    }

    static async deleteIFSC(ifscCode) {
        return await ifscModel.destroy({ where: { IFSC: ifscCode } });
    }
}

module.exports = IFSCService;
