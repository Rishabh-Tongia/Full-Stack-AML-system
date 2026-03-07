const Account = require("../models/Account");
const { v4: uuidv4 } = require("uuid");

// Create Account
const createAccount = async (req, res) => {
  try {

    const accountNumber = "ACC-" + uuidv4();

    const account = await Account.create({
      accountNumber,
      accountType: "savings",
      user: req.user._id,
      balance: 0
    });

    res.status(201).json({
      message: "Account created successfully",
      account
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get My Accounts
const getMyAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({
      user: req.user._id
    })
      .populate("user", "name email")
      .populate({
        path: "transactions",
        options: { sort: { createdAt: -1 }, limit: 10 }
      });

    res.status(200).json(accounts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAccountById = async (req, res) => {
  try {

    const account = await Account.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate("user", "name email");

    if (!account) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    res.status(200).json(account);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createAccount,
  getMyAccounts,
  getAccountById
};