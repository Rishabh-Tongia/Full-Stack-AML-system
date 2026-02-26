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

    flagReason: {
        type: String,
        default: ""
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Transaction",transactionSchema);