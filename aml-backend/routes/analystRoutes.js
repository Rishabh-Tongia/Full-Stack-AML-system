const express = require("express");
const router = express.Router();
const Case = require("../models/Case");

const { protect, authorize } = require("../middleware/authMiddleware");
const { getMyCases } = require("../controllers/analystController");

router.get("/cases", protect, authorize("analyst"), getMyCases);

router.get("/cases/:id", protect, authorize("analyst"), async (req, res) => {
    const caseData = await Case
        .findById(req.params.id)
        .populate({
            path: "account",
            populate: { path: "user" }
        });
    res.json(caseData);
});


router.put("/cases/:id/status", protect, authorize("analyst"), async (req, res) => {

    const { status } = req.body;

    const updated = await Case.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    res.json(updated);

});

router.post("/cases/:id/notes", protect, authorize("analyst"), async (req, res) => {

    const caseData = await Case.findById(req.params.id);

    caseData.notes.push({
        text: req.body.text,
        addedBy: req.user._id
    });

    await caseData.save();

    res.json(caseData);

});

module.exports = router;