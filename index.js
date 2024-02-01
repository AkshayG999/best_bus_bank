const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const { dbConfig } = require('./src/config/config');
const { ConnectionPool } = require('mssql');


// Middleware
app.use(express.json());

// Routes
app.use('/user', userRoutes);


const pool = new ConnectionPool(dbConfig);

pool.connect()
    .then(() => {
        console.log('Connected to the database successfully');
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
