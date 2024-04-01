const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const { sequelize } = require('./src/config/db');
app.use(express.json());
app.use(cors());



// Routes
app.use("/api/user", require("./src/routes/userRoutes"));
app.use("/api/admin", require("./src/routes/adminRoute"));
app.use("/api/parent-group", require("./src/routes/parentGroupRoute"));
app.use("/api/group", require("./src/routes/groupRoute"));
app.use("/api/ledger", require("./src/routes/ledgerRoute"));
app.use("/api/role", require("./src/routes/roleRoute"));
app.use("/api/branch", require("./src/routes/branchRoute"));
app.use("/api/department", require("./src/routes/departmentRoute"));

app.use("/api/features_master", require("./src/routes/featuresRoute/features_master_route"));
app.use("/api/features_A", require("./src/routes/featuresRoute/features_A_route"));
app.use("/api/features_B", require("./src/routes/featuresRoute/features_B_route"));
app.use("/api/features_C", require("./src/routes/featuresRoute/features_C_route"));

app.use("/api/features-master-permission", require("./src/routes/featuresPermissionRoute/features_master_permission_route"));
app.use("/api/features-A-permission", require("./src/routes/featuresPermissionRoute/features_A_permission_route"));
app.use("/api/features-B-permission", require("./src/routes/featuresPermissionRoute/features_B_permission_route"));
app.use("/api/features-C-permission", require("./src/routes/featuresPermissionRoute/features_C_permission_route"));

app.use("/api/features", require("./src/routes/featuresRoute"));
app.use("/api/roles-permissions", require("./src/routes/rolePermissionsRoute"));



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
