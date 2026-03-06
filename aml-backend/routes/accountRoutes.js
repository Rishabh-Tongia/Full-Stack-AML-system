const express = require("express");
const router = express.Router();

const { protect, authorize} = require("../middleware/authMiddleware");
const { createAccount, getMyAccounts } = require("../controllers/accountController");

router.post("/create", protect, createAccount);
router.get("/my", protect, authorize("user"), getMyAccounts);

module.exports = router;