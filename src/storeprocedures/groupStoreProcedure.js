const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/db');


// Define model for storing increment and month data
function procedure_store(sequelize) {
    const attributes = {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        increment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        month: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
    return sequelize.define('procedure_store', attributes);
}

const procedure_store_model = procedure_store(sequelize);

// _______________________________________________________________________________________________________________________________________

// Function to read increment from database
async function readIncrementFromDB(name) {
    const counter = await procedure_store_model.findOne({ where: { name: name } });
    console.log(counter);
    if (counter && counter.dataValues) {
        return counter.dataValues.increment;
    }
    return 0;
}

// Function to read month from database
async function readMonthFromDB(name) {
    const counter = await procedure_store_model.findOne({ where: { name: name } });
    if (counter && counter.dataValues) {
        return counter.dataValues.month;
    }
    return '';
}

// Function to write increment to database
async function writeIncrementToDB(name, increment) {
    // console.log(typeof increment);
    await procedure_store_model.update({ increment }, { where: { name: name } });
}

// Function to write month to database
async function writeMonthToDB(name, month) {
    await procedure_store_model.update({ month }, { where: { name: name } });
}

async function generateGroupUniqueCode(name, code, transaction) {
    try {
        const find = await procedure_store_model.findOne({ where: { name: name }, lock: transaction.LOCK.UPDATE });
        if (!find) {
            await procedure_store_model.create({ name });
        }

        const currentDate = new Date();
        const year = currentDate.getFullYear().toString().substring(2);
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);

        let increment = await readIncrementFromDB(name);
        if (month !== await readMonthFromDB(name)) {
            increment = 0;
            await writeMonthToDB(name, month);
        }
        console.log({ increment });
        console.log({ month });

        increment++;
        await writeIncrementToDB(name, increment);

        const paddedIncrement = increment.toString().padStart(6, '0');
        return `${code}${year}${month}-${paddedIncrement}`;
    } catch (error) {
        console.error('Error generating unique code:', error);
        throw error;
    }
}


// ________________________________________________________________________________________________________________________________________________________________-


// Function to read Sr No from database
async function readSrNoFromDB(name) {
    const counter = await procedure_store_model.findOne({ where: { name: name } });
    if (counter && counter.dataValues) {
        return counter.dataValues.increment;
    }
    return 100; // Default Sr No if no record exists
}

// Function to write Sr No to database
async function writeSrNoToDB(name, increment) {
    await procedure_store_model.update({ increment }, { where: { name: name } });
}

// Function to get the next Sr No
async function getNextSrNo(name) {
    const currentSrNo = await readSrNoFromDB(name);
    const nextSrNo = currentSrNo + 1;
    return nextSrNo;
}

// Function to create a new record with Sr No
async function createRecordWithSrNo(name, transaction) {
    try {
        const find = await procedure_store_model.findOne({ where: { name: name }, lock: transaction.LOCK.UPDATE });
        if (!find) {
            await procedure_store_model.create({ name, increment: 100 });
        }

        // Generate Sr No for the new record
        const nextSrNo = await getNextSrNo(name);

        // Update the Sr No of the new record
        await writeSrNoToDB(name, nextSrNo);

        console.log('New record created with Sr No:', nextSrNo);
        return nextSrNo;
    } catch (error) {
        console.error('Error generating Sr No:', error);
        throw error;
    }
}

// _________________________________________________________________________________________________________________________________________________________


module.exports = { generateGroupUniqueCode, createRecordWithSrNo, procedure_store_model }