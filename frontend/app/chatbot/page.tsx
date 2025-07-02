'use client';

import { useRef, useState } from 'react';
import { X } from 'lucide-react';

export default function ChatbotPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
      setSummary(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setSummary(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setUploadedFile(null);
    setSummary(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSummarize = async () => {
    if (!uploadedFile) return;

    setLoading(true);
    setSummary(null);

    try {
        const formData = new FormData();
        formData.append("file", uploadedFile);

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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-white space-y-6">
      {!uploadedFile ? (
        <div
          onClick={handleClick}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`w-full max-w-xl p-10 border-4 border-dashed rounded-2xl transition-colors duration-300 cursor-pointer text-center
            ${dragOver ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-600 bg-gray-800/30'}
          `}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-lg font-semibold">Déposez un document ici ou cliquez pour en sélectionner un</p>
        </div>
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

          <button
            onClick={handleSummarize}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Résumé en cours..." : "Résumer ce document"}
          </button>

          {summary && (
            <div className="max-w-xl w-full p-4 bg-gray-700 rounded-xl text-left text-sm">
              <pre className="whitespace-pre-wrap">{summary}</pre>
            </div>
          )}
        </>
      )}
    </main>
  );
}
