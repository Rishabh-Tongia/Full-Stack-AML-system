const Transaction = require("../models/Transaction");
const Account = require("../models/Account");

const createTransaction = async (req,res) => {
    try{
        const {accountId, type, amount} = req.body;

        //validate input
        if(!accountId || !type || !amount){
            return res.status(400).json({message: "All fields are required"});
        }

        //find Account
        const account = await Account.findById(accountId);

        if(!account){
            return res.status(400).json({message: "Account not found"});
        }

        //AML Rule - High amount rule
        let isFlagged = false;
        let flagReason = "";

        if(amount > 10000){
            isFlagged = true;
            flagReason = "Transaction amount exceeds 10000 threashold";
        }

        //update balance logic
        if(type === "deposit"){
            account.balance += amount;
        }
        else if(type ==="withdraw"){
            if(account.balance < amount){
                return res.status(400).json({message: "Insufficient balance"});
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
            flagReason
        });

        res.status(200).json({
            message: "Transaction successfull",
            transaction
        });
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
};

module.exports = {createTransaction};