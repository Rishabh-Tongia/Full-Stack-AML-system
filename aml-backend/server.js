const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const authRouter = require("./routes/authRoutes");
const transactionRouters = require("./routes/transactionRoutes");
const accountRoutes = require("./routes/accountRoutes");
const caseRoutes = require("./routes/caseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const analystRoutes = require("./routes/analystRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRouter);
app.use("/api/transactions",transactionRouters);
app.use("/api/accounts", accountRoutes);
app.use("/api/admin/cases", caseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/analyst", analystRoutes);

app.get("/", (req, res) => {
    res.send("AML Backend Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});