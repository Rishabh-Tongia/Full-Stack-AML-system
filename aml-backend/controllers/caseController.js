const Case = require("../models/Case");
const User = require("../models/User");

//GET ALL OPEN CASES
const getOpenCases = async (req, res) => {
    try {

        const cases = await Case.find({
            status: { $ne: "closed" }
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
        caseData.status = "underReview";

        await caseData.save();

        res.json({ message: "Case Assigned Successfully", caseData });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCaseNotes = async (req, res) => {
    try {
        const { text } = req.body;

        const caseData = await Case.findById(req.params.id);

        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        caseData.notes.push({
            text,
            addedBy: req.user._id,
        });

        await caseData.save();

        res.json({ message: "Note added successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const escalateCase = async (req, res) => {
    try {

        const caseData = await Case.findById(req.params.id);

        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        caseData.status = "escalated";

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

        caseData.status = "reported";

        await caseData.save();

        res.json({ message: "SAR Reported", caseData });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCaseById = async (req, res) => {
    try {

        const caseData = await Case.findById(req.params.id)
            .populate({
                path: "transactions",
                select: "type amount riskScore status createdAt"
            })
            .populate({
                path: "account",
                populate: {
                    path: "user",
                    select: "name email"
                }
            })
            .populate({
                path: "assignedTo",
                select: "name email"
            });

        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        res.json(caseData);

    } catch (error) {
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

const getAnalysts = async (req, res) => {
    try {
        const analysts = await User.find({ role: "analyst" }).select("name email");
        res.json(analysts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyCases = async (req, res) => {
    try {

        const cases = await Case.find({
            assignedTo: req.user._id,
            status: { $ne: "closed" }
        })
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

const getAnalystCases = async (req, res) => {
    try {
        const analystId = req.user.id;

        const cases = await Case.find({ assignedTo: analystId });

        res.json(cases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOpenCases,
    assignCase,
    addCaseNotes,
    escalateCase,
    reportCase,
    closeCase,
    getCaseById,
    getAnalysts,
    getMyCases,
    getAnalystCases
};
