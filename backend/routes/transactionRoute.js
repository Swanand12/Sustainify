import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { fetchAllTransactionsForBidController } from "../controllers/transactionController.js";

const router = express.Router();

// GET ALL TRANSACTIONS FOR BID || METHOD : GET
router.get(
  "/get-transactions/:bid",
  requireSignIn,
  fetchAllTransactionsForBidController
);

export default router;
