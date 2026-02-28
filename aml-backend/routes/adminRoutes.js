const express = require("express");
const router = express.Router();

const { createAnalyst, getDashboardStats } = require("../controllers/adminController");
const {protect, authorize} = require("../middleware/authMiddleware");

router.post("/create-analyst",protect, authorize("admin"),createAnalyst);
router.get("/dashboard", protect, authorize("admin"), getDashboardStats);

module.exports = router;