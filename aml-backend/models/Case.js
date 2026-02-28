const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true
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
        "Pending",
        "Under Review",
        "Escalated",
        "Reported",
        "Closed"
      ],
      default: "Pending"
    },

    totalRiskScore: {
      type: Number,
      default: 0
    },

    analystNotes: {
      type: String,
      default: ""
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);