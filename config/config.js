const fs = require('fs');


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
    }
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