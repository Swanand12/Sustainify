import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  fetchAllBidsController,
  fetchSingleBidController,
  fetchUserBidsController,
  filterBidsController,
  postBidController,
  updateBidAndTransactionDetails,
  updateBidTransactionStatusController,
} from "../controllers/bidController.js";

const router = express.Router();

// POST BID || METHOD : POST
router.post("/post-bid", requireSignIn, postBidController);

// GET ALL BID || METHOD : GET
router.get("/get-all-bid", requireSignIn, fetchAllBidsController);

// GET INDIVIDUAL USER BID || METHOD : GET
router.get("/get-user-bid", requireSignIn, fetchUserBidsController);

// GET SINGLE BID || METHOD : GET
router.get("/get-single-bid/:bid", requireSignIn, fetchSingleBidController);

// UPDATE BID AND TRANSACTION DETAILS|| METHOD : PUT
router.post(
  "/update-bid-transaction",
  requireSignIn,
  updateBidAndTransactionDetails
);

// FILTER BIDS || METHOD : POST
router.post("/filter-bids", requireSignIn, filterBidsController);

// FILTER BIDS || METHOD : POST
router.get(
  "/start-transaction/:bid",
  requireSignIn,
  updateBidTransactionStatusController
);

export default router;
