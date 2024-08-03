/**
 * Database synchronization script.
 *
 * This script provides two functions to synchronize database tables:
 * - `syncAllTables`: Synchronizes all tables in the database.
 * - `syncSpecificTables`: Synchronizes specific tables in the database (currently user and bank tables).
 *
 * Usage:
 * ```
 * node ./db/migration.js [all|specific]
 * ```
 *
 * @example
 * npm run migrate:all
 * npm run migrate:specific 
 */

"use strict";
const db = require("./db");

/**
 * Synchronizes all tables in the database.
 *
 * @async
 * @function syncAllTables
 * @returns {Promise<void>}
 */
const syncAllTables = async () => {
    try {
        await db.sequelize.sync({ alter: true });
        console.log("All tables synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing all tables:", error);
    } finally {
        process.exit();
    }
};

/**
 * Synchronizes specific tables in the database (currently user and bank tables).
 *
 * @async
 * @function syncSpecificTables
 * @returns {Promise<void>}
 */
const syncSpecificTables = async () => {
    try {
        await db.userModel.sync({ alter: true, logging: console.log });
        console.log("User table synchronized successfully.");

        // await db.bankModel.sync({ alter: true, logging: console.log });
        // console.log("Bank table synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing specific tables:", error);
    } finally {
        process.exit();
    }
};

const argument = process.argv[2];

if (argument === 'all') {
    syncAllTables();
} else if (argument === 'specific') {
    syncSpecificTables();
} else {
    console.log("Please provide a valid argument: 'all' or 'specific'");
    process.exit(1);
}