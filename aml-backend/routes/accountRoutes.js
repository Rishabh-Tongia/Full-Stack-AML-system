const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { createAccount, getMyAccounts } = require("../controllers/accountController");

router.post("/create", protect, createAccount);
router.get("/my", protect, getMyAccounts);

module.exports = router;