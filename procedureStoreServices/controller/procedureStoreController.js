const { procedure_store_model } = require("../model/procedureStoreModel");



// _______________________________________________________________________________________________________________________________________

// Function to read increment from database
async function readIncrementFromDB(name, transaction) {
    const options = transaction ? { transaction } : {};
    const counter = await procedure_store_model.findOne({ where: { name }, ...transaction });
    if (counter && counter.dataValues) {
        return counter.dataValues.increment;
    }
    return 0;
}

async function readMonthFromDB(name, transaction) {
    const options = transaction ? { transaction } : {};
    const counter = await procedure_store_model.findOne({ where: { name }, ...transaction });
    if (counter && counter.dataValues) {
        return counter.dataValues.month;
    }
    return '';
}

async function writeIncrementToDB(name, increment, transaction) {
    const options = transaction ? { where: { name }, transaction } : { where: { name } };
    return await procedure_store_model.update({ increment }, { where: { name }, ...transaction });
}

async function writeMonthToDB(name, month, transaction) {
    const options = transaction ? { where: { name }, transaction } : { where: { name }, ...transaction };
    await procedure_store_model.update({ month }, { where: { name }, ...transaction });
}

async function generateGroupUniqueCode(name, code, transaction) {
    let t;
    if (transaction) {
        t = { transaction };
    }
    try {
        // Lock the row for update
        const find = await procedure_store_model.findOne({ where: { name: name }, ...t, lock: transaction.LOCK.UPDATE });
        if (!find) {
            await procedure_store_model.create({ name }, t);
        }

        const currentDate = new Date();
        const year = currentDate.getFullYear().toString().substring(2);
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);

        let increment = await readIncrementFromDB(name, t);
        if (month !== await readMonthFromDB(name, t)) {
            increment = 0;
            await writeMonthToDB(name, month, t);
        }
        console.log({ increment });
        console.log({ month });

        increment++;
        await writeIncrementToDB(name, increment, t);

        const paddedIncrement = increment.toString().padStart(6, '0');
        return `${code}${year}${month}-${paddedIncrement}`;
    } catch (error) {
        console.error('Error generating unique code:', error);
        throw error;
    }
}


// ________________________________________________________________________________________________________________________________________________________________-


// Function to read Sr No from database
async function readSrNoFromDB(name, transaction) {
    try {
        const options = transaction ? { transaction } : {};
        const counter = await procedure_store_model.findOne({ where: { name }, ...transaction });
        if (counter && counter.dataValues) {
            return counter.dataValues.increment;
        }
        return 100; // Default Sr No if no record exists
    } catch (error) {
        console.error('Error reading Sr No from database:', error);
        throw error;
    }
}

async function writeSrNoToDB(name, increment, transaction) {
    try {
        // const options = transaction ? { where: { name }, transaction } : { where: { name } };
        return await procedure_store_model.update({ increment }, { where: { name }, ...transaction });
        console.log(result);
    } catch (error) {
        console.error('Error writing Sr No to database:', error);
        throw error;
    }
}

async function getNextSrNo(name, transaction) {
    try {
        const currentSrNo = await readSrNoFromDB(name, transaction);
        const nextSrNo = currentSrNo + 1;
        return nextSrNo;
    } catch (error) {
        console.error('Error getting next Sr No:', error);
        throw error;
    }
}

// Function to create a new record with Sr No
async function createRecordWithSrNo(name, transaction) {
    let t;
    if (transaction) {
        t = { transaction };
    }
    try {
        const find = await procedure_store_model.findOne({ where: { name: name }, ...t, lock: transaction.LOCK.UPDATE });
        // console.log({ find });
        if (!find) {
            const newRecord = await procedure_store_model.create({ name, increment: 100 }, t);
            console.log(newRecord.dataValues);
        }

        // Generate Sr No for the new record
        const nextSrNo = await getNextSrNo(name, t);
        // Update the Sr No of the new record
        await writeSrNoToDB(name, nextSrNo, t);
        // console.log( await writeSrNoToDB(name, nextSrNo, t))

        console.log('New record created with Sr No:', nextSrNo);
        return nextSrNo;
    } catch (error) {
        console.error('Error creating record with Sr No:', error);
        throw error;
    }
}

// _________________________________________________________________________________________________________________________________________________________


module.exports = { generateGroupUniqueCode, createRecordWithSrNo, procedure_store_model }