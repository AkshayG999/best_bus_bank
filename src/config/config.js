const fs = require('fs');
// const cert = fs.readFileSync('src/best-bus-pem.pem');


// config.js
module.exports = {
    dbConfig: {
        user: 'best_bus_db',
        password: 'bestbus123',
        server: 'best-bus-db.cxmaoe626bn4.ap-south-1.rds.amazonaws.com',
        database: 'best-bus-database',
        port: 5432,
        // database: 'postgres',
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