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
    caseData.status = "UnderReview";

    await caseData.save();

    res.json({
      message: "Case assigned successfully",
      caseData
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCases = async (req, res) => {
  try {
    const cases = await Case.find()
      .populate("assignedTo", "name email") // only fetch name & email
      .populate("transaction") 
      .sort({ createdAt: -1 });

    res.status(200).json(cases);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    // Run queries in parallel (IMPORTANT for performance)
    const [
      totalUsers,
      totalTransactions,
      flaggedTransactions,
      openCases,
      underReview,
      escalated,
      reported,
      closed
    ] = await Promise.all([
      User.countDocuments(),
      Transaction.countDocuments(),
      Transaction.countDocuments({ isFlagged: true }),
      Case.countDocuments({ status: "open" }),
      Case.countDocuments({ status: "underReview" }),
      Case.countDocuments({ status: "escalated" }),
      Case.countDocuments({ status: "reported" }),
      Case.countDocuments({ status: "closed" })
    ]);

    const totalCases = openCases + underReview + escalated + reported + closed;

    res.status(200).json({
      totalUsers,
      totalTransactions,
      flaggedTransactions,
      totalCases,
      caseBreakdown: {
        open: openCases,
        underReview,
        escalated,
        reported,
        closed
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createAnalyst, assignCase, getDashboardStats, getAllCases};