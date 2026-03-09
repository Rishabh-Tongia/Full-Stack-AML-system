const Case = require("../models/Case");

const getMyCases = async (req, res) => {
  try {

    const analystId = req.user.id;

    const cases = await Case.find({ assignedTo: analystId })
      .populate({
        path: "account",
        populate: {
          path: "user",
          select: "name email"
        }
      })
      .populate("transactions");

    res.json(cases);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyCases };