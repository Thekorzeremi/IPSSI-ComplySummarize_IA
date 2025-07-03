import { RequestHandler, Request, Response, NextFunction } from "express";
import { execFile } from "child_process";
import { unlink } from "fs/promises";
import { Document } from "../models/documentModel";
import axios, { AxiosResponse } from "axios";
import path from "path";
import util from "util";

axios.defaults.timeout = 120_000;

const pdfScriptPath = path.resolve(process.cwd(), "src", "pdf_reader.py");
const execFileAsync = util.promisify(execFile);

export const extractKeyPoints: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tmpPath = req.file?.path;
  if (!tmpPath || !req.file) {
    res.status(400).json({ error: "PDF manquant ou invalide" });
    return;
  }

  const uploadedFile: Express.Multer.File = req.file;

  try {
    // 1️⃣ Extraction texte via script Python
    const { stdout } = await execFileAsync("python3", [pdfScriptPath, tmpPath], {
      maxBuffer: 10 * 1024 * 1024, // 10 Mo
    });

    const parsed = JSON.parse(stdout.toString());
    const text: string = parsed.text;

    // 2️⃣ Préparation prompt IA
    const prompt = `Dresse une liste de points clés en français à partir de ce texte : ${text.slice(0, 3500)}. Donne une liste concise avec des tirets.`;

    const ollamaResponse: AxiosResponse<any> = await axios.post(
      "http://127.0.0.1:11434/api/generate",
      { model: "mistral", prompt, stream: false },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 120_000,
        validateStatus: () => true,
      }
    );

    if (ollamaResponse.status !== 200) {
      console.error("⚠️ Ollama error:", ollamaResponse.status, ollamaResponse.data);
      res.status(502).json({
        error: `Ollama a répondu ${ollamaResponse.status}`,
        details: ollamaResponse.data,
      });
      return;
    }

    const rawResponse: string = (ollamaResponse.data.response ?? "").trim();

    // 3️⃣ Nettoyage / structuration des points clés
    const keyPoints: string[] = rawResponse
      .split("\n")
      .map((line: string) => line.replace(/^[-•*]\s*/, "").trim())
      .filter((point: string) => point.length > 0);

    // 4️⃣ Sauvegarde dans MongoDB
    await Document.create({
      user: req.body.userId || "inconnu",
      fileName: uploadedFile.originalname,
      size: uploadedFile.size,
      keyPoints,
    });

    // 5️⃣ Réponse au client
    res.status(200).json({ keyPoints });
  } catch (err: unknown) {
    console.error("❌ Erreur dans extractKeyPoints:", err);

    if (axios.isAxiosError(err)) {
      res.status(502).json({
        error: "Erreur réseau avec Ollama",
        details: err.message,
      });
    } else {
      next(err);
    }
  } finally {
    await unlink(tmpPath).catch(() => void 0);
  }
};
