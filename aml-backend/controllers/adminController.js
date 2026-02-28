const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Case = require("../models/Case");

const createAnalyst = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
         return res.status(400).json({
            message: "User already exists"
         });
      }

      const analyst = await User.create({
         name,
         email,
         password,
         role: "analyst"
      });

      res.status(201).json({
         message: "Analyst created successfully",
         analyst
      });

   } catch (error) {
      res.status(500).json({
         message: error.message
      });
   }
};

const assignCase = async (req, res) => {
  try {
    const { analystId } = req.body;

    const caseData = await Case.findById(req.params.id);
    if (!caseData) {
      return res.status(404).json({ message: "Case not found" });
    }

    const analyst = await User.findById(analystId);
    if (!analyst || analyst.role !== "analyst") {
      return res.status(400).json({ message: "Invalid analyst" });
    }

    caseData.assignedTo = analyst._id;
    caseData.status = "Under Review";

    await caseData.save();

    res.json({
      message: "Case assigned successfully",
      caseData
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalTransactions = await Transaction.countDocuments();

    const flaggedTransactions = await Transaction.countDocuments({
      isFlagged: true
    });

    const openCases = await Case.countDocuments({ status: "Open" });
    const underReview = await Case.countDocuments({ status: "Under Review" });
    const escalated = await Case.countDocuments({ status: "Escalated" });
    const reported = await Case.countDocuments({ status: "Reported" });
    const closed = await Case.countDocuments({ status: "Closed" });

    res.json({
      totalTransactions,
      flaggedTransactions,
      openCases,
      underReview,
      escalated,
      reported,
      closed
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createAnalyst, assignCase, getDashboardStats};