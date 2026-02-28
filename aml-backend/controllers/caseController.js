const Case = require("../models/Case");
const User = require("../models/User");

//GET ALL OPEN CASES
const getOpenCases = async (req, res) => {
    try {

        const cases = await Case.find({
            status: { $ne: "Closed" }
        })
            .populate({
                path: "account",
                populate: { path: "user" }
            })
            .populate("transactions")
            .populate("assignedTo");

        res.json(cases);

    } catch (error) {
        res.status(500).json({ message: error.message });
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

        res.json({ message: "Case Assigned Successfully", caseData });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCaseNotes = async (req, res) => {
    try {
        const { notes } = req.body;

        const caseData = await Case.findById(req.params.id);

        if (!caseData) {
            return res.status(400).json({ message: "Case not found" });
        }

        caseData.analystNotes = notes;

        await caseData.save();
        res.json({ message: "Notes added", caseData });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const escalateCase = async (req, res) => {
    try {

        const caseData = await Case.findById(req.params.id);

        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        caseData.status = "Escalated";

        await caseData.save();

        res.json({ message: "Case escalated", caseData });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const reportCase = async (req, res) => {
    try {
        const caseData = await Case.findById(req.params.id);

        if (!caseData) {
            res.status(400).json({ message: "Case not found" });
        }

        caseData.status = "Reported";

        await caseData.save();

        res.json({ message: "SAR Reported", caseData });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const closeCase = async (req, res) => {
    try {
        const caseData = await Case.findById(req.params.id);

        if (!caseData) {
            return res.status(400).json({ message: "Case not found" });
        }

        caseData.status = "closed";

        await caseData.save();

        res.json({ message: "Case closed", caseData });
    }

    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOpenCases,
    assignCase,
    addCaseNotes,
    escalateCase,
    reportCase,
    closeCase
};
