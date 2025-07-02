import { RequestHandler } from "express";
import { execFile } from "child_process";
import { unlink } from "fs/promises";
import axios from "axios";
import path from "path";
import util from "util";

axios.defaults.timeout = 120_000;


const pdfScriptPath = path.resolve(process.cwd(), "src", "pdf_reader.py");

const execFileAsync = util.promisify(execFile);

export const summarizePdf: RequestHandler = async (req, res, next) => {
  const tmpPath = req.file?.path;
  if (!tmpPath) {
    res.status(400).send("PDF manquant");
    return;
  }

 try {
  /* 1️⃣  Extraction texte via pdfminer.six --------------------------- */
  const { stdout } = await execFileAsync(
    "py",                               // ou "python" selon ton install
    [pdfScriptPath, tmpPath],
    { maxBuffer: 10 * 1024 * 1024 }     // 10 Mo
  );

  const { text } = JSON.parse(stdout.toString());

  /* 2️⃣  Génération du résumé par Ollama ----------------------------- */
  const prompt =
    `Fais un résumé en français clair et structuré de 150 mots maximum sur le texte suivant : ${text.slice(0, 3500)}`; // changer la langue en fonction du choix de l'utilisateur

  const ollamaResponse = await axios.post(
    "http://127.0.0.1:11434/api/generate",   // ← loopback explicite
    { model: "mistral", prompt, stream: false },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 120_000,                       // 2min
      validateStatus: () => true
    }
  );

  /* 3️⃣  Vérifie le code HTTP d’Ollama ------------------------------- */
  if (ollamaResponse.status !== 200) {
    console.error(
      `⚠️  Ollama a renvoyé ${ollamaResponse.status}:`,
      ollamaResponse.data
    );
    res.status(502).json({
      error: `Ollama a répondu ${ollamaResponse.status}`,
      details: ollamaResponse.data
    });
    return;                                 
  }

  /* 4️⃣  Réponse OK au client ---------------------------------------- */
  res.json({ summary: (ollamaResponse.data.response ?? "").trim() });
} catch (err) {
  /* 5️⃣  Gestion des erreurs Node/Axios ------------------------------ */
  console.error("❌ Erreur dans summarizePdf:", err);
  if (axios.isAxiosError(err)) {
    res.status(502).json({
      error: "Appel à Ollama impossible",
      details: err.message
    });
  } else {
    next(err);                              // délègue au middleware d’erreurs
  }
} finally {
  /* 6️⃣  Nettoyage du fichier temporaire ----------------------------- */
  await unlink(tmpPath).catch(() => void 0);
}
};
