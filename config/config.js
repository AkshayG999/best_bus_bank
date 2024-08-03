const fs = require('fs');
require("dotenv").config();


console.log("DB Config:", {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    port: process.env.POSTGRES_PORT,
    dialect: process.env.DIALECT
});

module.exports = {
    dbConfig: {
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        server: process.env.HOST,
        database: process.env.DB,
        port: process.env.POSTGRES_PORT,
        dialect: process.env.DIALECT,
        // ssl: true,
        options: {
            encrypt: false,
            trustServerCertificate: false,
            cryptoCredentialsDetails: {
                minVersion: 'TLSv1'
            },
            // ssl: {
            //     ca: cert
            // }
        }
    },
    development: {
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DB,
        host: process.env.HOST,
        port: process.env.POSTGRES_PORT,
        dialect: process.env.DIALECT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
};


// module.exports = {
//     dbConfig: {
//         user: 'admin',
//         password: 'Bestbus123',
//         server: 'database-1.cxvnuvhxv2yf.ap-south-1.rds.amazonaws.com',
//         port: 1433,
//         database: 'bestBus',
//         dialect: 'mssql',
//         options: {
//             encrypt: false,
//             trustServerCertificate: false,
//             cryptoCredentialsDetails: {
//                 minVersion: 'TLSv1'
//             },
//             // ssl: {
//             //     ca: cert
//             // }
//         }
//     }
// };