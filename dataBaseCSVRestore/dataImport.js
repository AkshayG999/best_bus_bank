// const fs = require('fs');
// const csv = require('csv-parser');
// const moment = require('moment');
// const { Sequelize, DataTypes } = require('sequelize');

// async function importCSVData(csvFilePath, model, batchSize = 500) {
//     const sanitizeInput = (value, typeParser) => {
//         if (value === '' || value === 'NULL') return null; // Handle 'NULL' string
//         const parsedValue = typeParser(value);
//         return isNaN(parsedValue) ? null : parsedValue;
//     };

//     const typeParsers = {
//         'INTEGER': parseInt,
//         'BIGINT': parseInt,
//         'FLOAT': parseFloat,
//         'DOUBLE': parseFloat,
//         'DECIMAL': (value) => sanitizeInput(value, parseFloat),
//         'BOOLEAN': (value) => value === 'true' ? true : (value === 'false' ? false : null),
//         'STRING': (value) => value === '' ? null : value,
//         'TEXT': (value) => value === '' ? null : value,
//         'DATE': (value) => value === '' ? null : validateDate(value),
//         'DATEONLY': (value) => value === '' ? null : validateDate(value),
//         'TIME': (value) => value === '' ? null : value,
//         'TIMESTAMP': (value) => value === '' ? null : validateDate(value),
//     };

//     // const typeParsers = {
//     //     'INTEGER': (value) => (value === '' || value === 'NULL') ? null : parseInt(value, 10),
//     //     'BIGINT': (value) => (value === '' || value === 'NULL') ? null : parseInt(value, 10),
//     //     'FLOAT': (value) => (value === '' || value === 'NULL') ? null : parseFloat(value),
//     //     'DOUBLE': (value) => (value === '' || value === 'NULL') ? null : parseFloat(value),
//     //     'BOOLEAN': (value) => value === 'true' ? true : (value === 'false' ? false : null),
//     //     'STRING': (value) => value === '' ? null : value,
//     //     'TEXT': (value) => value === '' ? null : value,
//     //     'DATE': (value) => value === '' ? null : validateDate(value),
//     //     'DATEONLY': (value) => value === '' ? null : validateDate(value),
//     //     'TIME': (value) => value === '' ? null : value,
//     //     'TIMESTAMP': (value) => value === '' ? null : validateDate(value),
//     // };


//     // Function to validate and format dates
   
//     function validateDate(dateString) {
//         if (!dateString) return null;
//         const date = moment(dateString, moment.ISO_8601, true);
//         return date.isValid() ? date.toISOString() : null;
//     }

//     return new Promise((resolve, reject) => {
//         const results = [];

//         fs.createReadStream(csvFilePath)
//             .pipe(csv())
//             .on('data', (row) => {
//                 console.log('Raw Row Data:', row);
//                 const cleanedRow = {};
//                 // console.log(model);
//                 for (let columnName in model.rawAttributes) {
//                     if (!model.rawAttributes.hasOwnProperty(columnName)) continue;

//                     const attribute = model.rawAttributes[columnName];
//                     const dataType = attribute.type.key;

//                     if (row[columnName] === '') {
//                         cleanedRow[columnName] = null;
//                     } else if (typeParsers[dataType]) {
//                         cleanedRow[columnName] = typeParsers[dataType](row[columnName]);
//                         if (isNaN(cleanedRow[columnName]) && typeParsers[dataType] === parseInt) {
//                             cleanedRow[columnName] = null;
//                         }
//                     } else {
//                         cleanedRow[columnName] = row[columnName];
//                     }
//                 }
//                 // console.log('Processed Row:', cleanedRow);
//                 results.push(cleanedRow);
//             })
//             .on('end', async () => {
//                 console.log('CSV file successfully processed. Inserting data into the database...');

//                 try {
//                     for (let i = 0; i < results.length; i += batchSize) {
//                         const batch = results.slice(i, i + batchSize);
//                         await model.bulkCreate(batch, { validate: true });
//                         console.log(`Inserted batch ${Math.ceil(i / batchSize) + 1}`);
//                     }
//                     resolve();
//                 } catch (error) {
//                     reject(error);
//                 }
//             })
//             .on('error', (error) => {
//                 reject(error);
//             });
//     });
// }

// module.exports = { importCSVData };


const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');
const { Sequelize, DataTypes } = require('sequelize');

async function importCSVData(csvFilePath, model, batchSize = 500) {
    const sanitizeInput = (value, typeParser) => {
        if (value === '' || value === 'NULL') return null;
        const parsedValue = typeParser(value);
        return isNaN(parsedValue) ? null : parsedValue;
    };

    const typeParsers = {
        'INTEGER': parseInt,
        'BIGINT': parseInt,
        'FLOAT': parseFloat,
        'DOUBLE': parseFloat,
        'DECIMAL': (value) => sanitizeInput(value, parseFloat),
        'BOOLEAN': (value) => value === 'true' ? true : (value === 'false' ? false : null),
        'STRING': (value) => value === '' ? null : value,
        'TEXT': (value) => value === '' ? null : value,
        'DATE': (value) => value === '' ? null : validateDate(value),
        'DATEONLY': (value) => value === '' ? null : validateDate(value),
        'TIME': (value) => value === '' ? null : value,
        'TIMESTAMP': (value) => value === '' ? null : validateDate(value),
    };

    function validateDate(dateString) {
        if (!dateString) return null;
        const date = moment(dateString, moment.ISO_8601, true);
        return date.isValid() ? date.toISOString() : null;
    }

    // Function to normalize keys by removing any quotes and whitespace
    function normalizeKeys(row) {
        const normalizedRow = {};
        for (let key in row) {
            if (row.hasOwnProperty(key)) {
                const normalizedKey = key.replace(/^['"]|['"]$/g, ''); // Remove both single and double quotes
                normalizedRow[normalizedKey.trim()] = row[key]; // Trim any whitespace around the key
            }
        }
        return normalizedRow;
    }

    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                // Normalize the row keys
                const normalizedRow = normalizeKeys(row);
                // console.log('Normalized Row Data:', normalizedRow); // Debug: Print the normalized row

                const cleanedRow = {};
                for (let columnName in model.rawAttributes) {
                    if (!model.rawAttributes.hasOwnProperty(columnName)) continue;

                    const attribute = model.rawAttributes[columnName];
                    const dataType = attribute.type.key;

                    const rowValue = normalizedRow[columnName];

                    // console.log(`Processing ${columnName}: ${rowValue}`); // Debug each column

                    if (rowValue === undefined || rowValue === '') {
                        cleanedRow[columnName] = null;
                    } else if (typeParsers[dataType]) {
                        cleanedRow[columnName] = typeParsers[dataType](rowValue);
                        if (isNaN(cleanedRow[columnName]) && typeParsers[dataType] === parseInt) {
                            cleanedRow[columnName] = null;
                        }
                    } else {
                        cleanedRow[columnName] = rowValue;
                    }
                }
                // console.log('Processed Row:', cleanedRow); // Debug: Print the cleaned row
                results.push(cleanedRow);
            })
            .on('end', async () => {
                console.log('CSV file successfully processed. Inserting data into the database...');
                try {
                    for (let i = 0; i < results.length; i += batchSize) {
                        const batch = results.slice(i, i + batchSize);
                        await model.bulkCreate(batch, { validate: true });
                        console.log(`Inserted batch ${Math.ceil(i / batchSize) + 1}`);
                    }
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}


module.exports = { importCSVData };