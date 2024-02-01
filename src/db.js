const sql = require('mssql');
const config = require('./config');

sql.on('error', err => {
    console.error('SQL Error:', err);
});


async function connect() {
    try {
        await sql.connect(config);
        console.log('Connected to MSSQL database');
    } catch (error) {
        console.error('Error connecting to MSSQL database:', error);
        throw error;
    }
}

async function close() {
    try {
        await sql.close();
        console.log('Connection to MSSQL database closed');
    } catch (error) {
        console.error('Error closing MSSQL connection:', error);
        throw error;
    }
}

async function executeQuery(query) {
    try {
        const result = await sql.query(query);
        return result.recordset;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

module.exports = {
    connect,
    close,
    executeQuery
};
