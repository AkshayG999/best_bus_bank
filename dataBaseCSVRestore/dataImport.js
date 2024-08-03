const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');
const { Sequelize, DataTypes } = require('sequelize');
/**
 * Imports data from a CSV file into a specified database model.
 *
 * @param {string} csvFilePath - The path to the CSV file to import.
 * @param {Object} model - The Sequelize model to import the data into.
 * @param {number} [batchSize=5000] - The number of records to insert in each batch.
 * @return {Promise<void>} A promise that resolves when the import is complete.
 */
async function importCSVData(csvFilePath, model, batchSize = 5000) {
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
        'STRING': (value) => value.trim() === '' ? null : validateNull(value),
        'TEXT': (value) => value === '' ? null : value,
        'DATE': (value) => value === '' ? null : validateDate(value),
        'DATEONLY': (value) => value === '' ? null : validateDate(value),
        'TIME': (value) => value === '' ? null : value,
        'TIMESTAMP': (value) => value === '' ? null : validateDate(value),
        'SMALLINT': (value) => sanitizeInput1(value, parseInt),
    };

    function validateNull(string) {
        if (!string) return null;
        if (string == 'NULL') return null;
        if (string) return string.trim();
    }
    function validateDate(dateString) {
        if (!dateString) return null;
        const date = moment(dateString, moment.ISO_8601, true);
        return date.isValid() ? date.toISOString() : null;
    }

    function normalizeKeys(row) {
        const normalizedRow = {};
        for (let key in row) {
            if (row.hasOwnProperty(key)) {
                const normalizedKey = key.replace(/^['"]|['"]$/g, '');
                normalizedRow[normalizedKey.trim()] = row[key];
            }
        }
        return normalizedRow;
    }
    const sanitizeInput1 = (value, typeParser) => {
        if (value === '' || value === 'NULL') return null;
        const parsedValue = typeParser ? typeParser(value) : value;
        return isNaN(parsedValue) && typeParser ? null : parsedValue;
    };

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

                    let rowValue = normalizedRow[columnName];

                    // if (columnName === 'EntryNo') {
                    //     rowValue = rowValue.toString(); // Convert EntryNo to string
                    // }

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
                console.log(`CSV file successfully processed. Total rows: ${results.length}`);
                console.log('CSV file successfully processed. Inserting data into the database...');

                let insertedCount = 0;
                for (let i = 0; i < results.length; i += batchSize) {
                    const batch = results.slice(i, i + batchSize);
                    try {
                        await model.bulkCreate(batch, { validate: true });
                        insertedCount += batch.length;
                        console.log(`Inserted batch ${Math.ceil(i / batchSize) + 1}. Total inserted: ${insertedCount}`);
                    } catch (batchError) {
                        console.error(`Error in batch ${Math.ceil(i / batchSize) + 1}:`, batchError);
                        // Log the problematic records
                        batch.forEach((record, index) => {
                            console.error(`Problem record ${i + index}:`, record);
                        });
                    }
                }
                console.log(`Data import complete. Total rows inserted: ${insertedCount}`);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}


module.exports = { importCSVData };

