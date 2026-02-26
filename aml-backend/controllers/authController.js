const User = require("../models/User");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        //create User
        const user = await User.create({
            name,
            email,
            password
        });

        //generate account no 
        const accountNumber = "ACC-" + uuidv4();

        //Create account inked to user
        const account = await Account.create({
            accountNumber,
            owner: user._id,
            balance: 0
        });

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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req,res) => {
    try{
        const{email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expressIn: "id"}
        );

        res.status(200).json({
            message: "Login Successfull",
            token
        });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports = { registerUser, loginUser};