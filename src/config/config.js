const fs = require('fs');
const cert = fs.readFileSync('src/best-bus-pem.pem');

// config.js
module.exports = {
    dbConfig: {
        user: 'Best_bus_db',
        password: 'best-bus-123',
        server: 'db-best-bus.cxvnuvhxv2yf.ap-south-1.rds.amazonaws.com',
        database: 'best-bus-database',
        options: {
            encrypt: false,
            trustServerCertificate: false,
            cryptoCredentialsDetails: {
                minVersion: 'TLSv1'
            },
            ssl: {
                ca: cert
            }
        }
    }
};