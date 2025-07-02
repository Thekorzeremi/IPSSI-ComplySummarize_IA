import express from "express";
import type { RequestHandler } from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser as RequestHandler);
router.post("/login", loginUser as RequestHandler);

export default router;
