const IFSCService = require('../services/ifscService');

class IFSCController {
    static async createIFSC(req, res) {
        try {
            const ifsc = await IFSCService.createIFSC(req.body);
            res.status(201).json(ifsc);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getIFSC(req, res) {
        try {
            const ifsc = await IFSCService.getIFSCByCode(req.params.ifscCode);
            if (!ifsc) {
                return res.status(404).json({ message: 'IFSC not found' });
            }
            res.status(200).json(ifsc);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllIFSCs(req, res) {
        try {
            const ifscs = await IFSCService.getAllIFSCs();
            res.status(200).json(ifscs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateIFSC(req, res) {
        try {
            const updated = await IFSCService.updateIFSC(req.params.ifscCode, req.body);
            if (updated[0] === 0) {
                return res.status(404).json({ message: 'IFSC not found or no changes made' });
            }
            res.status(200).json({ message: 'IFSC updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteIFSC(req, res) {
        try {
            const deleted = await IFSCService.deleteIFSC(req.params.ifscCode);
            if (!deleted) {
                return res.status(404).json({ message: 'IFSC not found' });
            }
            res.status(200).json({ message: 'IFSC deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = IFSCController;
