const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const { sequelize } = require('./src/config/db');
app.use(express.json());
app.use(cors());



// Routes
app.use('/user', userRoutes);
app.use("/api/people", require("./src/controllers/userController"));
app.use("/api/parent-group", require("./src/routes/parentGroupRoute"));
app.use("/api/group", require("./src/routes/groupRoute"));
app.use("/api/ledger", require("./src/routes/ledgerRoute"));



app.get('/', (req, res) => {
    res.send("server is running..")
});


sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
