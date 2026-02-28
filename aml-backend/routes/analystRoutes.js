const express = require("express");
const router = express.Router();

const {protect, authorize} = require("../middleware/authMiddleware");
const { getMyCases } = require("../controllers/analystController");

router.get("/cases", protect, authorize("analyst"), getMyCases);

module.exports = router;