const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },

    type: {
        type: String,
        enum: ["deposit", "withdrawal", "transfer"],
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    isFlagged: {
        type: Boolean,
        default: false
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ["Pending", "Under Review", "Cleared", "Confirmed Suspicious"],
        default: "Pending"
    },

    riskScore: {
        type: Number,
        default: 0
    },

    flagReasons: [{
        type: String,
    }]
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);