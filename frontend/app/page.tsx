"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <section className="w-full max-w-3xl flex flex-col items-center justify-center text-center gap-8 py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-[0_2px_24px_rgba(80,80,200,0.25)]">
          La révolution de vos documents est en marche
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl drop-shadow-[0_1px_8px_rgba(80,80,200,0.10)]">
          Gagnez un temps précieux dans l’analyse de vos documents réglementaires grâce à l’IA. Résumez, synthétisez et exploitez l’essentiel en quelques secondes.
        </p>
        <a
          href="#chatbot"
          className="inline-block px-10 py-4 bg-[#acacac5e] text-white font-semibold rounded-xl shadow-xl hover:bg-gray-600/20 focus:outline-none focus:ring-4 focus:ring-[#acacac5e]/60 transition-all text-xl mt-2 glow-btn"
        >
          Résumer mon document
        </a>
      </section>
    </main>
  );
}
