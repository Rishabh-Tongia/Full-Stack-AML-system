const Transaction = require("../models/Transaction");
const runAmlChecks = require("../services/amlEngine");
const Account = require("../models/Account");
const Case = require("../models/Case");

const createTransaction = async (req, res) => {
    try {
        const { accountId, type, amount } = req.body;

        //validate input
        if (!accountId || !type || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: "Amount must be positive" });
        }

        //find Account
        const account = await Account.findById(accountId);

        if (!account) {
            return res.status(400).json({ message: "Account not found" });
        }

        if (account.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to access this account"
            });
        }

        if (account.isFrozen) {
            return res.status(403).json({
                message: "Account is frozen due to suspicious activity"
            });
        }

        //AML Rules
        const { isFlagged, flagReasons, riskScore } =
            await runAmlChecks(accountId, type, amount);

        //update balance logic
        if (type === "deposit") {
            account.balance += amount;
        }
        else if (type === "withdrawal") {
            if (account.balance < amount) {
                return res.status(400).json({ message: "Insufficient balance" });
            }
            account.balance -= amount;
        }

        await account.save();

        //create transaction record
        const transaction = await Transaction.create({
            account: accountId,
            type,
            amount,
            isFlagged,
            riskScore,
            flagReasons
        });

        res.status(200).json({
            message: "Transaction successfull",
            transaction
        });

        if (isFlagged) {

            const flaggedCount = await Transaction.countDocuments({
                account: accountId,
                isFlagged: true
            });

            if (flaggedCount >= 3) {
                await Account.findByIdAndUpdate(accountId, {
                    isFrozen: true
                });
            }

            let existingCase = await Case.findOne({
                account: accountId,
                status: { $in: ["Pending", "Under Review"] }
            });

            if (!existingCase) {
                // Create new case
                await Case.create({
                    account: accountId,
                    transactions: [transaction._id],
                    totalRiskScore: riskScore
                });
            } else {
                // Update existing case
                existingCase.transactions.push(transaction._id);
                existingCase.totalRiskScore += riskScore;
                await existingCase.save();
            }
        }

        if (transaction.isFlagged) {
            const analyst = await User.findOne({ role: "analyst" });

            transaction.assignedTo = analyst._id;
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate("account")
            .sort({ createdAt: -1 });

        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTransaction, getAllTransactions };