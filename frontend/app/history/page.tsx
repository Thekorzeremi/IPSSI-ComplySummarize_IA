"use client";
import { useState } from "react";

const conversations = [
  {
    id: "1",
    title: "RGPD_Contrat_2024.pdf",
    createdAt: "2025-06-30 14:22",
    messages: [
      {
        role: "user",
        content: "[Document uploadé] RGPD_Contrat_2024.pdf",
      },
      {
        role: "assistant",
        content: "Résumé : Ce contrat RGPD détaille les obligations de conformité pour les sous-traitants, les droits des personnes concernées, et les procédures de notification en cas de violation...",
      },
    ],
  },
  {
    id: "2",
    title: "Directive_MIFID2.docx",
    createdAt: "2025-06-28 09:10",
    messages: [
      {
        role: "user",
        content: "[Document uploadé] Directive_MIFID2.docx",
      },
      {
        role: "assistant",
        content: "Résumé : La directive MIFID2 vise à renforcer la transparence des marchés financiers européens, améliorer la protection des investisseurs, et encadrer les pratiques de conseil...",
      },
    ],
  },
  {
    id: "3",
    title: "RGPD_Contrat_2024.pdf",
    createdAt: "2025-06-30 14:22",
    messages: [
      {
        role: "user",
        content: "[Document uploadé] RGPD_Contrat_2024.pdf",
      },
      {
        role: "assistant",
        content: "Résumé : Ce contrat RGPD détaille les obligations de conformité pour les sous-traitants, les droits des personnes concernées, et les procédures de notification en cas de violation...",
      },
    ],
  },
  {
    id: "4",
    title: "RGPD_Contrat_2024.pdf",
    createdAt: "2025-06-30 14:22",
    messages: [
      {
        role: "user",
        content: "[Document uploadé] RGPD_Contrat_2024.pdf",
      },
      {
        role: "assistant",
        content: "Résumé : Ce contrat RGPD détaille les obligations de conformité pour les sous-traitants, les droits des personnes concernées, et les procédures de notification en cas de violation...",
      },
    ],
  },
];

export default function History() {
  const [selectedId, setSelectedId] = useState(conversations[0]?.id || "");
  const selected = conversations.find((c) => c.id === selectedId);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#181c2375] rounded-xl overflow-hidden shadow-xl border border-white/10 mt-8 mx-auto max-w-5xl">
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
              <div className={`text-sm ${msg.role === "user" ? "text-blue-300" : "text-gray-200"}`}>{msg.content}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}