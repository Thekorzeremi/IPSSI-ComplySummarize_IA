import { Router } from "express";
import multer from "multer";
import path from "path";
import { summarizePdf } from "../controllers/summarizeController";

const router = Router();
const upload = multer({ dest: path.resolve("uploads") });

router.post("/summarize", upload.single("pdf"), summarizePdf);

export default router;