const path = require('path');
const { sequelize } = require('../db/db');
const { importCSVData } = require('./dataImport');

// // Usage
// const csvFilePath = path.join(__dirname, './member/Mast_MemberInformation.csv');
// const model = require('../memberRegistration/models/informationModel')(sequelize);

// const csvFilePath = path.join(__dirname, './member/Mast_MemberInformation_Address.csv');
// const model = require('../memberRegistration/models/addressModel')(sequelize);

// const csvFilePath = path.join(__dirname, './member/Mast_MemberInformation_BankInfo.csv');
// const model = require('../memberRegistration/models/bankInfoModel')(sequelize);

// const csvFilePath = path.join(__dirname, './member/Mast_MemberInformation_AttachDocument.csv');
// const model = require('../memberRegistration/models/documentModel')(sequelize);

const csvFilePath = path.join(__dirname, './member/Mast_MemberInformation_Nominee.csv');
const model = require('../memberRegistration/models/nomineeModel')(sequelize);

// const csvFilePath = path.join(__dirname, './member/instmast.csv');
// const model = require('../memberRegistration/models/memberInstallmentModel')(sequelize);

// const csvFilePath = path.join(__dirname, './member/Mast_MemberShipType.csv');
// const model = require('../memberRegistration/models/memberShipTypeModel')(sequelize);

// const csvFilePath = path.join(__dirname, './member/Mast_Branch.csv');
// const model = require('../master_data_entry/models/branchModel')(sequelize);

importCSVData(csvFilePath, model, 2000) 
    .then(() => {
        console.log('Data import complete.');
        return sequelize.close();
    })
    .catch((error) => {
        console.error('Error during import:', error);
        return sequelize.close();
    });
