import express from "express";
import {
  userLoginController,
  userRegisterController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// USER REGISTERATION || METHOD : POST
router.post("/register", userRegisterController);

// USER LOGIN || METHOD : POST
router.post("/login", userLoginController);

// USER AUTHORIZATION || METHOD : GET
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

export default router;
