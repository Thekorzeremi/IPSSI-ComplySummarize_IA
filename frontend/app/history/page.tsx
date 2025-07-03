"use client";
import { useState, useEffect } from "react";

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  messages: { role: "user" | "assistant"; content: string }[];
}

export default function History() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserId(parsed.id);
      } catch (e) {
        console.error("Erreur parsing user dans localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = prev || "auto";
    };
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchConversations = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/documents?userId=${userId}`);
        const data = await res.json();

        const formatted: Conversation[] = data.map((doc: any) => {
          const baseMessage = {
            role: "user" as const,
            content: `[Document uploadé] ${doc.fileName}`,
          };

          let assistantMessage;

          if (doc.summary) {
            assistantMessage = {
              role: "assistant" as const,
              content: `Résumé : ${doc.summary}`,
            };
          } else if (doc.keyPoints && doc.keyPoints.length > 0) {
            assistantMessage = {
              role: "assistant" as const,
              content:
                "Points clés :\n" + doc.keyPoints.map((pt: string) => `• ${pt}`).join("\n"),
            };
          } else {
            assistantMessage = {
              role: "assistant" as const,
              content: "(Aucun résumé ou point clé disponible)",
            };
          }

          return {
            id: doc._id,
            title: doc.fileName,
            createdAt: new Date(doc.createdAt).toLocaleString(),
            messages: [baseMessage, assistantMessage],
          };
        });

        setConversations(formatted);
        if (formatted.length > 0) setSelectedId(formatted[0].id);
      } catch (err) {
        console.error("Erreur récupération documents :", err);
      }
    };

    fetchConversations();
  }, [userId]);

  const selected = conversations.find((c) => c.id === selectedId);
  
  return (
    <div className="flex h-[calc(100vh-200px)] bg-[#181c2375] rounded-xl overflow-hidden shadow-xl border border-white/10 mt-8 mx-auto max-w-5xl">
      <aside className="w-64 bg-[#13161b63] border-r border-white/10 flex flex-col">
        <div className="p-4 text-white font-bold text-lg border-b border-white/10">Historique</div>
        <nav className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={`w-full text-left px-4 py-3 flex flex-col gap-1 border-b border-white/5 transition bg-transparent hover:bg-[#232834] focus:bg-[#50628a63] ${selectedId === conv.id ? "bg-[#232834]" : ""}`}
            >
              <span className="text-white font-medium truncate">{conv.title}</span>
              <span className="text-xs text-gray-400">{conv.createdAt}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col bg-[#181c2363]">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">{selected?.title}</h2>
          <div className="text-xs text-gray-400 mt-1">{selected?.createdAt}</div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {selected?.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-2xl rounded-xl px-5 py-4 shadow-lg border border-white/10 ${msg.role === "user" ? "bg-[#232834] ml-auto text-right" : "bg-[#21242a] mr-auto text-left"}`}
            >
              <div className={`text-sm ${msg.role === "user" ? "text-blue-300" : "text-gray-200"}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
