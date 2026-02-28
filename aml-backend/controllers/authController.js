const User = require("../models/User");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// ================= REGISTER =================
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️⃣ Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2️⃣ Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3️⃣ Create user (password will be hashed by model pre-save hook)
        const user = await User.create({
            name,
            email,
            password
        });

        // 4️⃣ Generate account number
        const accountNumber = "ACC-" + uuidv4();

        // 5️⃣ Create account linked to user
        const account = await Account.create({
            accountNumber,
            user: user._id,   // ✅ FIXED (was owner before)
            balance: 0
        });

        // 6️⃣ Send response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            account: {
                accountNumber: account.accountNumber,
                balance: account.balance
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2️⃣ Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // 3️⃣ Compare password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // 4️⃣ Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 5️⃣ Send token
        res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };