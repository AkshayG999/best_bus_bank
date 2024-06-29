const { memberShipTypeModel } = require('../../db/db');

class MembershipTypeService {
    async getAllMembershipTypes() {
        return await memberShipTypeModel.findAll();
    }

    async getMembershipTypeById(id) {
        return await memberShipTypeModel.findByPk(id);
    }

    async createMembershipType(data) {
        return await memberShipTypeModel.create(data);
    }

    async updateMembershipType(id, data) {
        const membershipType = await memberShipTypeModel.findByPk(id);
        if (!membershipType) {
            throw new Error('MembershipType not found');
        }
        return await membershipType.update(data);
    }

    async deleteMembershipType(id) {
        const membershipType = await memberShipTypeModel.findByPk(id);
        if (!membershipType) {
            throw new Error('MembershipType not found');
        }
        return await membershipType.destroy();
    }
}

module.exports = new MembershipTypeService();
