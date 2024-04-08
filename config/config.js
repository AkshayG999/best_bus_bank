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