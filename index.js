const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const { sequelize } = require('./db/db');
const { errorHandler } = require('./middlewareServices/errorMid');

app.use(express.json());
app.use(cors());



app.use("/api/features", require("./adminServices/routes/featuresRoute"));
app.use("/api/roles-permissions", require("./adminServices/routes/rolePermissionsRoute"));

app.use("/api/user", require("./userServices/routes/userRoutes"));
app.use("/api/user", require("./adminServices/routes/userPermissionsRoute"));
app.use("/api/admin", require("./otherServices/routes/adminRoute"));
app.use("/api/parent-group", require("./otherServices/routes/parentGroupRoute"));
app.use("/api/group", require("./otherServices/routes/groupRoute"));
app.use("/api/individual-account", require("./otherServices/routes/individualAccountRoute"));
app.use("/api/bank", require("./otherServices/routes/bankRoute"));
app.use("/api/bank-branch", require("./otherServices/routes/bankBranchRoute"));
app.use("/api/branch", require("./otherServices/routes/branchRoute"));
app.use("/api/department", require("./otherServices/routes/departmentRoute"));
app.use("/api/depos", require("./otherServices/routes/depoRoute"));


app.use(errorHandler);

app.get('/', (req, res) => {
    res.send("server is running..")
});


// sequelize.sync({ alter: true })
//     .then(() => {
//         console.log('Database synchronized successfully.');
//     })
//     .catch(err => {
//         console.error('Error synchronizing database:', err);
//     });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});