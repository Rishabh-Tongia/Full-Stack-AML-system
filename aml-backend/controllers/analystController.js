const Case = require("../models/Case");

const getMyCases = async (req, res) => {
  try {
    const cases = await Case.find({
      assignedTo: req.user._id
    })
      .populate("account")
      .populate("transactions");

      console.log("Logged in user:", req.user);
    res.json(cases);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyCases };