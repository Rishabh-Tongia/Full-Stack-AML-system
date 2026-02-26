const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    accountNumber:{
        type: String,
        required: true,
        unique: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Account",accountSchema);