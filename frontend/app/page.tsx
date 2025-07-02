"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

function useInView<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, inView];
}

export default function Home() {
  const [presentationRef, presentationInView] = useInView<HTMLDivElement>({ threshold: 0.18 });
  const [avantagesRef, avantagesInView] = useInView<HTMLDivElement>({ threshold: 0.18 });
  const [tarifsRef, tarifsInView] = useInView<HTMLDivElement>({ threshold: 0.18 });
  const [faqRef, faqInView] = useInView<HTMLDivElement>({ threshold: 0.18 });
  const [footerRef, footerInView] = useInView<HTMLElement>({ threshold: 0.18 });

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
          href="/auth"
          className="inline-block px-10 py-4 bg-[#acacac5e] text-white font-semibold rounded-xl shadow-xl hover:bg-[#b6b6b69c] focus:outline-none focus:ring-4 focus:ring-[#acacac5e]/60 transition-all text-xl mt-2 glow-btn"
        >
          Commencer dès maintenant
        </a>
      </section>

      <section
  ref={presentationRef}
  className={`w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 pt-32 pb-20 transition-opacity duration-700 ${presentationInView ? "animate-fade-up" : "opacity-0"}`}
>
        <div className="flex-1 flex flex-col gap-6 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">ComplySummarize, votre copilote réglementaire</h2>
          <p className="text-lg md:text-xl text-gray-200">
            Simplifiez l’analyse et la gestion de vos documents réglementaires grâce à l’IA. ComplySummarize vous permet de résumer, synthétiser et exploiter l’essentiel de vos textes en quelques secondes, tout en garantissant la conformité et la sécurité de vos données.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/reglementaire.png"
            alt="Illustration IA et documents"
            width={600}
            height={420}
            className="drop-shadow-2xl rounded-2xl border border-white/10 bg-white/5"
          />
        </div>
      </section>

      <section
  ref={avantagesRef}
  className={`w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-8 transition-opacity duration-700 ${avantagesInView ? "animate-fade-up animate-delay-1" : "opacity-0"}`}
>
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

      <section
  ref={tarifsRef}
  className={`w-full max-w-6xl mx-auto py-16 flex flex-col items-center transition-opacity duration-700 ${tarifsInView ? "animate-fade-up animate-delay-2" : "opacity-0"}`}
>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Des tarifs adaptés à tous les besoins</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 rounded-2xl p-8 flex flex-col items-center border border-white/10 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-2">Gratuit</h3>
            <div className="text-4xl font-extrabold text-white mb-2">0€</div>
            <ul className="text-gray-200 mb-4 space-y-2 text-sm mt-2">
              <li>• Résumés illimités</li>
              <li>• Résumés IA standards</li>
              <li>• Export PDF/Word</li>
              <li>• Traitement de fichier jusqu'à 5mb</li>
              <li>• Historique des résumés</li>
              <li>• Accès web sécurisé</li>
            </ul>
            <button className="mt-auto px-6 py-2 rounded-lg bg-white/15 text-white font-semibold cursor-pointer hover:bg-white/30 transition">Commencer</button>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 flex flex-col items-center border-2 border-white/60 shadow-xl scale-105">
            <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
            <div className="text-4xl font-extrabold text-white mb-2">9,99€<span className="text-lg font-medium text-white">/mois</span></div>
            <ul className="text-gray-200 mb-4 space-y-2 text-sm">
              <li>• Résumés illimités</li>
              <li>• Synthèses avancées</li>
              <li>• Export PDF/Word</li>
              <li>• Pas de limite de traitement</li>
              <li>• Support prioritaire</li>
              <li>• Historique des résumés</li>
              <li>• Accès web sécurisé</li>
            </ul>
            <button className="mt-auto px-6 py-2 rounded-lg bg-white/15 cursor-pointer text-white font-semibold hover:bg-white/30 transition">Choisir Pro</button>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 flex flex-col items-center border border-white/10 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-2">Entreprise</h3>
            <div className="text-4xl font-extrabold text-white mb-2">Sur devis</div>
            <ul className="text-gray-200 mb-4 space-y-2 text-sm mt-4">
              <li>• Fonctionnalités de la formule Pro</li>
              <li>• Accès API</li>
              <li>• Personnalisation avancée</li>
              <li>• Gestion utilisateurs</li>
              <li>• Accompagnement expert</li>
            </ul>
            <button className="mt-auto px-6 py-2 rounded-lg bg-white/15 text-white font-semibold hover:bg-white/30 cursor-pointer transition">Contactez-nous</button>
          </div>
        </div>
      </section>

      <section
  ref={faqRef}
  className={`w-full max-w-4xl mx-auto py-16 transition-opacity duration-700 ${faqInView ? "animate-fade-up animate-delay-4" : "opacity-0"}`}
>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">FAQ</h2>
        <div className="flex flex-col gap-6">
          <details className="bg-white/5 rounded-xl p-6 border border-white/10 group" open>
            <summary className="cursor-pointer text-lg font-semibold text-white flex items-center justify-between">
              Comment fonctionne ComplySummarize&nbsp;?
              <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-gray-200">Notre IA analyse vos documents réglementaires, en extrait l’essentiel et vous fournit un résumé structuré, des obligations clés et des recommandations personnalisées.</p>
          </details>
          <details className="bg-white/5 rounded-xl p-6 border border-white/10 group">
            <summary className="cursor-pointer text-lg font-semibold text-white flex items-center justify-between">
              Mes documents sont-ils confidentiels&nbsp;?
              <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-gray-200">Oui, vos fichiers sont traités dans un environnement sécurisé, auto-hébergé, et ne sont jamais transmis à des tiers. Nous garantissons la confidentialité et la sécurité de vos données.</p>
          </details>
          <details className="bg-white/5 rounded-xl p-6 border border-white/10 group">
            <summary className="cursor-pointer text-lg font-semibold text-white flex items-center justify-between">
              Quels sont les tarifs et comment souscrire&nbsp;?
              <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-gray-200">Vous pouvez commencer gratuitement ou choisir une offre Pro/Entreprise selon vos besoins. L’inscription et la gestion des abonnements se font directement depuis l’interface.</p>
          </details>
          <details className="bg-white/5 rounded-xl p-6 border border-white/10 group">
            <summary className="cursor-pointer text-lg font-semibold text-white flex items-center justify-between">
              Quels types de documents puis-je résumer&nbsp;?
              <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-gray-200">ComplySummarize prend en charge la majorité des formats courants (PDF, Word, texte, etc.) et s’adapte à la taille et la complexité de vos documents professionnels.</p>
          </details>
        </div>
      </section>

      <footer
  ref={footerRef}
  className={`w-full py-10 flex flex-col items-center justify-center text-center bg-transparent transition-opacity duration-700 ${footerInView ? "animate-fade-in animate-delay-5" : "opacity-0"}`}
>
        <div className="text-white font-semibold text-lg flex items-center gap-2 mb-2">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#24292f" /><text x="16" y="21" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="monospace">CS</text></svg>
          ComplySummarize
        </div>
        <div className="text-gray-400 text-sm mb-2">&copy; {new Date().getFullYear()} ComplySummarize. Tous droits réservés.</div>
        <div className="flex gap-4 text-gray-400 text-sm">
          <a href="#" className="hover:text-white transition">Mentions légales</a>
          <a href="#" className="hover:text-white transition">Confidentialité</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </footer>
    </main>
  );
}
