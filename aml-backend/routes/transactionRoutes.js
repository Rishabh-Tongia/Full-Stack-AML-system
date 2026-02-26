const express = require("express");
const {createTransaction} = require("../controllers/transactionController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createTransaction);

module.exports = router;