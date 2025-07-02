"use client";

import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function ChatbotPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [keyPoints, setKeyPoints] = useState<string[] | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

   useEffect(() => {
      const prev = document.body.style.overflowY;
      document.body.style.overflowY = "hidden";
      return () => {
        document.body.style.overflowY = prev || "auto";
      };
    }, []);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
      setSummary(null);
      setKeyPoints(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setSummary(null);
      setKeyPoints(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setUploadedFile(null);
    setSummary(null);
    setKeyPoints(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSummarize = async () => {
    if (!uploadedFile) return;

    setLoading(true);
    setSummary(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("userId", userId); // ⬅️ on ajoute dynamiquement le userId

      const response = await fetch("http://localhost:8000/api/summarize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur inconnue");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error: any) {
      console.error("Erreur lors du résumé :", error);
      setSummary("Erreur lors du résumé : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPoints = async () => {
    if (!uploadedFile) return;

    setLoading(true);
    setKeyPoints(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("userId", userId);

      const response = await fetch("http://localhost:8000/api/extract-keypoints", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur inconnue");
      }

      const data = await response.json();
      setKeyPoints(data.keyPoints);
    } catch (error: any) {
      console.error("Erreur lors de l'extraction des points clés :", error);
      setKeyPoints(["Erreur : " + error.message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-white space-y-6">
      {!uploadedFile ? (
        <>
          <div className="flex items-center">
            <Image src="/ai.png" alt="IA icon" width={60} height={60} className="filter grayscale mr-4 " />
            <p className="text-4xl font-extrabold text-white/50">Qu'allez-vous résumer aujourd'hui ?</p>
          </div>
          <div
            onClick={handleClick}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`w-full max-w-xl p-10 mt-4 border-4 border-dashed rounded-2xl transition-colors duration-300 cursor-pointer text-center
              ${dragOver ? 'border-white bg-white/10' : 'border-white/25 bg-white/10'}
            `}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-md text-gray-200/50 font-semibold">Cliquez ou déposez un document ici</p>
          </div>
        </>
      ) : (
        <>
          <div className="relative w-full max-w-xl p-6 rounded-xl border border-gray-600 bg-gray-800/30 text-center">
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              aria-label="Supprimer le fichier"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-lg font-semibold">📄 {uploadedFile.name}</p>
            <p className="text-sm text-gray-400 mt-1">
              Taille : {(uploadedFile.size / 1024).toFixed(1)} Ko
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleSummarize}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Résumé en cours..." : "Résumer ce document"}
            </button>

            <button
              onClick={handleKeyPoints}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition text-white text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analyse en cours..." : "Générer les points clés"}
            </button>
          </div>

          {summary && (
            <div className="max-w-xl w-full p-4 bg-gray-700 rounded-xl text-left text-sm">
              <h3 className="text-white font-semibold mb-2">Résumé :</h3>
              <pre className="whitespace-pre-wrap">{summary}</pre>
            </div>
          )}

          {keyPoints && (
            <div className="max-w-xl w-full p-4 bg-gray-700 rounded-xl text-left text-sm">
              <h3 className="text-white font-semibold mb-2">Points clés :</h3>
              <ul className="list-disc list-inside space-y-1">
                {keyPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </main>
  );
}
