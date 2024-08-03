"use strict";
const { sequelize } = require("./db");

sequelize.sync({ alter: true, logging: true })
    .then(() => {
        console.log("Tables synchronized successfully.");
        // process.exit();
    })
    .catch((error) => {
        console.error("Error synchronizing tables:", error);
        // process.exit(1);
    });
