require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./db/db');
const { errorHandler } = require('./middlewareServices/errorMid');
const routes = require('./routes');
const app = express();

// require('./dataBaseCSVRestore/index');

// Middleware for security headers
app.use(helmet());

// Enable compression
app.use(compression());

// Enable CORS with default options
app.use(cors());

app.use(express.json());

// Rate limiting to prevent DDOS attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

app.use(limiter);

app.use('/', routes);

// Global error handler
app.use(errorHandler);


app.get('/test', (req, res) => {
    res.send("Server is running..");
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    // Perform cleanup if necessary
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    app.close(() => {
        console.log('Http server closed.');
        // Close db connections here if needed
        process.exit(0);
    });
});
