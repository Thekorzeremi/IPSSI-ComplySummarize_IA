import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 bg-white">
      <section className="w-full max-w-3xl flex flex-col items-center justify-center text-center gap-8 py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
          La révolution de vos documents est en marche
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl">
          Gagnez un temps précieux dans l’analyse de vos documents réglementaires grâce à l’IA. Résumez, synthétisez et exploitez l’essentiel en quelques secondes.
        </p>
        <a
          href="#chatbot"
          className="inline-block px-10 py-4 bg-[#24292f] text-white font-semibold rounded-xl shadow-lg hover:bg-[#1a1d21] transition-colors text-xl mt-2"
        >
          Accéder au chatbot
        </a>
      </section>
    </main>
  );
}
