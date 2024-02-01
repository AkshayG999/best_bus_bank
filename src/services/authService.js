const { dbConfig } = require('../config/config');
const { ConnectionPool } = require('mssql');

const pool = new ConnectionPool(dbConfig);

pool.connect();

exports.login = async (loginID, password) => {
    try {
        const result = await pool.request()
            .input('loginID', loginID)
            .input('password', password)
            .query('SELECT * FROM Users WHERE loginID = @loginID AND password = @password');

        if (result.recordset.length === 0) {
            throw new Error('Invalid credentials');
        }

        // Generate and return JWT token here
        const token = generateToken(result.recordset[0].id);

        return token;
    } catch (error) {
        throw error;
    }
};

function generateToken(userID) {
    // Implement JWT token generation here
}
