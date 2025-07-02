import express, { Request, Response, Router } from "express";
import { Document } from "../models/documentModel";

const router: Router = express.Router();

router.get("/documents", (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId || typeof userId !== "string") {
    res.status(400).json({ error: "Paramètre 'userId' requis" });
    return;
  }

  Document.find({ user: userId })
    .sort({ createdAt: -1 })
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((error) => {
      console.error("Erreur documents:", error);
      res.status(500).json({ error: "Erreur serveur" });
    });
});

export default router;
