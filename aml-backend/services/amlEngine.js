const Transaction = require("../models/Transaction");

const runAmlChecks = async (accountId, type, amount) => {
    let isFlagged = false;
    let flagReasons = [];
    let riskScore = 0;

    // RULE 1: High amount
    if (amount > 10000) {
        isFlagged = true;
        flagReasons.push("High transaction amount (>10000)");
        riskScore += 40;
    }

    // RULE 2: Frequent transactions (more than 3 in last 1 minute)
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

    const recentTransactions = await Transaction.countDocuments({
        account: accountId,
        createdAt: { $gte: oneMinuteAgo }
    });

    if (recentTransactions >= 3) {
        isFlagged = true;
        flagReasons.push("Too many transactions within 1 minute");
        riskScore += 30;
    }

    // RULE 3: Large withdrawal after large deposit
    if (type === "withdrawal") {

        const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

        const recentLargeDeposit = await Transaction.findOne({
            account: accountId,
            type: "deposit",
            amount: { $gte: 8000 },
            createdAt: { $gte: twoMinutesAgo }
        });

        if (recentLargeDeposit) {
            isFlagged = true;
            flagReasons.push("Large withdrawal shortly after large deposit");
            riskScore += 50;
        }
    }

    return { isFlagged, flagReasons, riskScore };
};

module.exports = runAmlChecks;