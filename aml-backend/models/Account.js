const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  accountType: { 
    type: String,
    enum: ["savings", "current"],
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["ACTIVE", "FROZEN", "BLOCKED"],
    default: "ACTIVE"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  transactions: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Transaction" 
    }
  ],
  isFrozen: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Account", accountSchema);