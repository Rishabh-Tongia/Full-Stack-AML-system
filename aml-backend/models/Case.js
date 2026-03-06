const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true
    },

    caseNumber: {
      type: String,
      unique: true
    },

    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
      }
    ],

    status: {
      type: String,
      enum: [
        "pending",
        "underReview",
        "escalated",
        "reported",
        "closed"
      ],
      default: "pending"
    },

    totalRiskScore: {
      type: Number,
      default: 0
    },

    notes: [
      {
        text: {
          type: String,
          required: true,
        },
        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);