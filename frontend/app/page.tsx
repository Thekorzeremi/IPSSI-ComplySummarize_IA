"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full px-4">
      <section className="w-full min-h-screen flex flex-col items-center justify-center text-center gap-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-[0_2px_24px_rgba(80,80,200,0.25)]">
          La révolution de vos documents <br />est en marche
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

      {/* Présentation produit */}
      <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 pt-32 pb-20">
        <div className="flex-1 flex flex-col gap-6 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">ComplySummarize, votre copilote réglementaire</h2>
          <p className="text-lg md:text-xl text-gray-200">
            Simplifiez l’analyse et la gestion de vos documents réglementaires grâce à l’IA. ComplySummarize vous permet de résumer, synthétiser et exploiter l’essentiel de vos textes en quelques secondes, tout en garantissant la conformité et la sécurité de vos données.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/illustration-docs-ai.svg"
            alt="Illustration IA et documents"
            width={400}
            height={320}
            className="drop-shadow-2xl rounded-2xl border border-white/10 bg-white/5"
          />
        </div>
      </section>

      {/* Avantages */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-8">
        <div className="bg-white/5 rounded-2xl p-7 flex flex-col gap-3 shadow-lg border border-white/10">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 text-white text-2xl">⏱️</div>
          <h3 className="font-bold text-lg text-white">Gagnez un temps précieux</h3>
          <p className="text-gray-200">Analysez et résumez instantanément des documents volumineux et complexes grâce à la puissance de notre IA.</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-7 flex flex-col gap-3 shadow-lg border border-white/10">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 text-white text-2xl">📄</div>
          <h3 className="font-bold text-lg text-white">Synthèse claire et actionnable</h3>
          <p className="text-gray-200">Obtenez des résumés structurés, des obligations clés et des recommandations prêtes à l’emploi pour vos équipes.</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-7 flex flex-col gap-3 shadow-lg border border-white/10">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 text-white text-2xl">🛡️</div>
          <h3 className="font-bold text-lg text-white">Conformité et sécurité</h3>
          <p className="text-gray-200">Vos fichiers sont traités par notre IA auto-hébergée dans un environnement sécurisé et confidentiel. Vous garantissant le respect des exigences réglementaires.</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-7 flex flex-col gap-3 shadow-lg border border-white/10">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 text-white text-2xl">🤝</div>
          <h3 className="font-bold text-lg text-white">Interface intuitive</h3>
          <p className="text-gray-200">Une expérience utilisateur fluide, pensée pour tous les profils, sans formation requise.</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-7 flex flex-col gap-3 shadow-lg border border-white/10">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 text-white text-2xl">🔒</div>
          <h3 className="font-bold text-lg text-white">Confidentialité</h3>
          <p className="text-gray-200">Nous nous engageons à protéger vos données et à vous assurer que vos documents restent confidentiels. En aucun cas, vos données ne seront pas transmises à des tiers.</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-7 flex flex-col gap-3 shadow-lg border border-white/10">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 text-white text-2xl">⚡</div>
          <h3 className="font-bold text-lg text-white">Performance</h3>
          <p className="text-gray-200">Notre IA est optimisée pour traiter des documents volumineux et complexes en quelques secondes.</p>
        </div>
      </section>

      {/* Tarifs */}
      <section className="w-full max-w-6xl mx-auto py-16 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Des tarifs adaptés à tous les besoins</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Gratuit */}
          <div className="bg-white/5 rounded-2xl p-8 flex flex-col items-center border border-white/10 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-2">Gratuit</h3>
            <div className="text-4xl font-extrabold text-white mb-2">0€</div>
            <ul className="text-gray-200 mb-4 space-y-2 text-sm mt-2">
              <li>• Résumés illimités</li>
              <li>• Résumés IA standards</li>
              <li>• Export PDF/Word</li>
              <li>• Traitement de fichier jusqu'à 5mb</li>
              <li>• Accès web sécurisé</li>
            </ul>
            <button className="mt-auto px-6 py-2 rounded-lg bg-white/15 text-white font-semibold hover:bg-green-700 transition">Commencer</button>
          </div>
          {/* Pro */}
          <div className="bg-white/10 rounded-2xl p-8 flex flex-col items-center border-2 border-blue-500/60 shadow-xl scale-105">
            <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
            <div className="text-4xl font-extrabold text-blue-400 mb-2">19€<span className="text-lg font-medium text-blue-200">/mois</span></div>
            <ul className="text-gray-200 mb-4 space-y-2 text-sm">
              <li>• Résumés illimités</li>
              <li>• Synthèses avancées</li>
              <li>• Export PDF/Word</li>
              <li>• Pas de limite de traitement</li>
              <li>• Support prioritaire</li>
              <li>• Accès web sécurisé</li>
            </ul>
            <button className="mt-auto px-6 py-2 rounded-lg bg-blue-700/80 text-white font-semibold hover:bg-blue-700 transition">Choisir Pro</button>
          </div>
          {/* Entreprise */}
          <div className="bg-white/5 rounded-2xl p-8 flex flex-col items-center border border-white/10 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-2">Entreprise</h3>
            <div className="text-4xl font-extrabold text-purple-400 mb-2">Sur devis</div>
            <ul className="text-gray-200 mb-4 space-y-2 text-sm mt-4">
              <li>• Accès API</li>
              <li>• Personnalisation avancée</li>
              <li>• Gestion utilisateurs</li>
              <li>• Accompagnement expert</li>
            </ul>
            <button className="mt-auto px-6 py-2 rounded-lg bg-purple-700/80 text-white font-semibold hover:bg-purple-700 transition">Contactez-nous</button>
          </div>
        </div>
      </section>

    </main>
  );
}
