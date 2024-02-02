const fs = require('fs');



function readIncrementFromFile() {
    try {
        const data = fs.readFileSync('increment.txt', 'utf8');
        return parseInt(data, 10);
    } catch (err) {
        return 0;
    }
}

function writeIncrementToFile(increment) {
    fs.writeFileSync('increment.txt', increment.toString(), 'utf8');
}

function generateUniqueCode() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substring(2); // Get last 2 digits of the year
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Get month with leading zero

    let increment = readIncrementFromFile();
    if (month !== readMonthFromFile()) {
        increment = 0; // Reset increment if it's a new month
        writeMonthToFile(month);
    }

    increment++;
    writeIncrementToFile(increment);

    const paddedIncrement = increment.toString().padStart(6, '0');
    return `BR${year}${month}-${paddedIncrement}`;
}

function readMonthFromFile() {
    try {
        return fs.readFileSync('month.txt', 'utf8').trim();
    } catch (err) {
        return ''; // Default to empty string if file doesn't exist or cannot be read
    }
}

function writeMonthToFile(month) {
    fs.writeFileSync('month.txt', month.toString(), 'utf8');
}


// Reset TR NO -----------------------------------------------------------------------------------------------
function resetValues() {
    try {
        // Reset increment value to 0
        writeIncrementToFile(0);

        // Reset month value to empty string
        writeMonthToFile('');

        console.log('Increment and month values reset.');
    } catch (error) {
        console.error('Error resetting values:', error);
    }
}

// Function to read increment value from file
function readIncrementFromFile() {
    try {
        const data = fs.readFileSync('increment.txt', 'utf8');
        return parseInt(data, 10);
    } catch (err) {
        return 0;
    }
}

// Function to write increment value to file
function writeIncrementToFile(increment) {
    fs.writeFileSync('increment.txt', increment.toString(), 'utf8');
}

// Function to generate unique code
function generateUniqueCode() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substring(2); // Get last 2 digits of the year
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Get month with leading zero

    let increment = readIncrementFromFile();
    if (month !== readMonthFromFile()) {
        increment = 0; // Reset increment if it's a new month
        writeMonthToFile(month);
    }

    increment++;
    writeIncrementToFile(increment);

    const paddedIncrement = increment.toString().padStart(6, '0');
    return `BR${year}${month}-${paddedIncrement}`;
}

// Function to read month value from file
function readMonthFromFile() {
    try {
        return fs.readFileSync('month.txt', 'utf8').trim();
    } catch (err) {
        return ''; // Default to empty string if file doesn't exist or cannot be read
    }
}

// Function to write month value to file
function writeMonthToFile(month) {
    fs.writeFileSync('month.txt', month.toString(), 'utf8');
}

//  ------------------------------------------------------------------------------------------------------------------


// Sr No for Group
function readSrNoFromFile() {
    try {
        const data = fs.readFileSync('srno.txt', 'utf8');
        return parseInt(data, 10);
    } catch (err) {
        return 100; // Default to 100 if file doesn't exist or cannot be read
    }
}
function writeSrNoToFile(srNo) {
    fs.writeFileSync('srno.txt', srNo.toString(), 'utf8');
}
function getNextSrNo() {
    const currentSrNo = readSrNoFromFile();
    const nextSrNo = currentSrNo + 1;
    return nextSrNo;
}
function createRecord() {
    try {
        const nextSrNo = getNextSrNo();
        writeSrNoToFile(nextSrNo);
        console.log('New record created with SrNo:', nextSrNo);
        return nextSrNo;
    } catch (error) {
        console.error('Error creating record:', error);
    }
}

//  ---------------------------------------------------------------------------------------------------------------------------


// Reset 
// Function to read the current SrNo from a file
function readSrNoFromFile() {
    try {
        const data = fs.readFileSync('srno.txt', 'utf8');
        return parseInt(data, 10);
    } catch (err) {
        return 100; // Default to 100 if file doesn't exist or cannot be read
    }
}

// Function to write the updated SrNo to the file
function writeSrNoToFile(srNo) {
    fs.writeFileSync('srno.txt', srNo.toString(), 'utf8');
}

// Function to get the next available SrNo
function getNextSrNo() {
    const currentSrNo = readSrNoFromFile();
    const nextSrNo = currentSrNo + 1;
    return nextSrNo;
}

// Function to reset SrNo back to the initial value (101)
function resetSrNo() {
    try {
        writeSrNoToFile(100);
        console.log('SrNo reset to 101.');
    } catch (error) {
        console.error('Error resetting SrNo:', error);
    }
}

// resetValues();
// resetSrNo();

module.exports = { generateUniqueCode, createRecord }