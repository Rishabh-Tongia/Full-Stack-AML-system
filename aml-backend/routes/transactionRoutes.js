const express = require("express");
const {createTransaction, getAllTransactions} = require("../controllers/transactionController");
const {protect, authorize} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createTransaction);
router.get("/all", protect, authorize("admin"), getAllTransactions);

module.exports = router;