const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const authRouter = require("./routes/authRoutes");
const transactionRouters = require("./routes/transactionRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRouter);
app.use("/api/transactions",transactionRouters);

app.get("/", (req, res) => {
    res.send("AML Backend Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});