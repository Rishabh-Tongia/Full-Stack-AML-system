const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");


const { getOpenCases, addCaseNotes, escalateCase, reportCase, closeCase} = require("../controllers/caseController");
const { assignCase } = require("../controllers/caseController")

router.get("/", protect, authorize("admin"), getOpenCases);

router.put("/:id/assign", protect, authorize("admin"), assignCase);

router.put("/:id/notes", protect, authorize("analyst"), addCaseNotes);

router.put("/:id/escalate", protect, authorize("analyst"), escalateCase);

router.put("/:id/report", protect, authorize("analyst"), reportCase);

router.put("/:id/closed", protect, authorize("admin"), closeCase);

module.exports = router;