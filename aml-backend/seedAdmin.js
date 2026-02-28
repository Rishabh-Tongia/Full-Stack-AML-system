require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({ role: "admin" });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit();
        }

        const admin = await User.create({
            name: "Super Admin",
            email: "admin@aml.com",
            password: "Admin@123",  // plain password
            role: "admin"
        });

        console.log("Admin created successfully:");
        console.log(admin.email);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdmin();