const fs = require('fs');
// const cert = fs.readFileSync('src/best-bus-pem.pem');


// // config.js
module.exports = {
    dbConfig: {
        user: 'sbi_db',
        password: 'Database@123',
        server: 'sbi-db.postgres.database.azure.com',
        database: 'best-bus-db',
        // database: 'postgres',
        port: 5432,
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
//         user: 'postgres',
//         password: 'Akshay@143',
//         server: 'localhost',
//         port: 5432,
//         database: 'best-bus-bank',
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