const express = require("express");
const {createTransaction, getAllTransactions, getTransactionsByAccount} = require("../controllers/transactionController");
const {protect, authorize} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createTransaction);
router.get("/all", protect, authorize("admin"), getAllTransactions);
router.get("/account/:id", protect, getTransactionsByAccount);

module.exports = router;