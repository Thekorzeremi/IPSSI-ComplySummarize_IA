import { Router } from "express";
import multer from "multer";
import path from "path";
import { extractKeyPoints } from "../controllers/extractKeyPointsController";

const router = Router();
const upload = multer({ dest: path.resolve("uploads") });

router.post("/extract-keypoints", upload.single("file"), extractKeyPoints);

export default router;

