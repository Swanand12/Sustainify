import express from "express";
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  getWalletValues,
  postWalletValues,
} from "../controllers/walletController.js";

const router = express.Router();

// POST WALLET VALUES || METHOD : POST
router.post("/post-wallet", requireSignIn, postWalletValues);

// GET WALLET VALUES || METHOD : GET
router.get("/get-wallet", requireSignIn, getWalletValues);

export default router;
