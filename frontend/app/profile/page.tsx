"use client";

import { useEffect, useState } from "react";
import useRequireAuth from "../useRequireAuth";
import { useRouter } from "next/navigation";

const subscriptions = [
  {
    id: "Free",
    name: "Gratuit",
    price: "0€",
    features: [
      "Résumés illimités",
      "Résumés IA standards",
      "Export PDF/Word",
      "Traitement de fichier jusqu'à 5 Mb",
      "Historique des résumés",
      "Accès web sécurisé",
    ],
  },
  {
    id: "Pro",
    name: "Pro",
    price: "9,99€/mois",
    features: [
      "Résumés illimités",
      "Synthèses avancées",
      "Export PDF/Word",
      "Pas de limite de traitement",
      "Support prioritaire",
      "Historique des résumés",
      "Accès web sécurisé",
    ],
  },
  {
    id: "Entreprise",
    name: "Entreprise",
    price: "29,99€/mois",
    features: [
      "Toutes les fonctionnalités de la formule Pro",
      "Accès API",
      "Personnalisation avancée",
      "Gestion utilisateurs",
      "Accompagnement expert",
    ],
  },
];

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [tab, setTab] = useState<"infos" | "abos">("infos");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/auth");
      return;
    }
    const parsed = JSON.parse(stored);
    const subscription = parsed.subscription || "Free";
    setUser({ ...parsed, subscription });
    setForm({ ...parsed, password: "", subscription, newsletter: true });
  }, [router]);

  if (!user || !form) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!form.username || !form.email) {
      setError("Nom d'utilisateur et email sont requis.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user._id || user.id,
          username: form.username,
          email: form.email,
          password: form.password || undefined,
          subscription: form.subscription,
          newsletter: form.newsletter,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setUser(data.user);
      setForm({ ...data.user, password: "", subscription: data.user.subscription || "Free", newsletter: form.newsletter });
      localStorage.setItem("user", JSON.stringify(data.user));
      setEdit(false);
      setMessage("Profil mis à jour avec succès.");
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour");
    }
  }

  function handleDelete() {
    localStorage.removeItem("user");
    setShowDelete(false);
    router.push("/auth");
  }

  function handleChangeSub(newSub: string) {
    setForm((prev: any) => ({ ...prev, subscription: newSub }));
    setUser((u: any) => {
      const updatedUser = { ...u, subscription: newSub };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-[#181c2375] rounded-xl shadow-xl border border-white/10 p-0 text-white overflow-hidden">
      <div className="flex border-b border-white/10 bg-[#13161b63]">
        <button
          className={`flex-1 py-4 text-lg font-bold transition border-b-2 ${tab === "infos" ? "border-white text-white bg-[#4444449d]" : "border-transparent text-gray-300 hover:bg-[#474747b7]"}`}
          onClick={() => setTab("infos")}
        >
          Infos personnelles & options
        </button>
        <button
          className={`flex-1 py-4 text-lg font-bold transition border-b-2 ${tab === "abos" ? "border-white text-white bg-[#4444449d]" : "border-transparent text-gray-300 hover:bg-[#474747b7]"}`}
          onClick={() => setTab("abos")}
        >
          Abonnements
        </button>
      </div>
      <div className="p-8">
        {tab === "infos" && (
          <>
            <h1 className="text-xl font-bold mb-6">Mon profil</h1>
            {message && <div className="mb-4 text-green-400 text-sm">{message}</div>}
            {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
            <form onSubmit={handleSave} className="flex flex-col gap-6">
              <div>
                <label className="block text-gray-300 mb-1">Nom d'utilisateur</label>
                <input
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  disabled={!edit}
                  className="w-full rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!edit}
                  className="w-full rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Mot de passe</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={!edit}
                  placeholder="••••••••"
                  className="w-full rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  name="newsletter"
                  type="checkbox"
                  checked={form.newsletter}
                  onChange={handleChange}
                  disabled={!edit}
                  className="accent-white w-4 h-4 rounded border border-white/20"
                />
                <label className="text-gray-300">Recevoir la newsletter</label>
              </div>
              <div className="flex gap-4 mt-4">
                {!edit ? (
                  <button
                    type="button"
                    onClick={() => setEdit(true)}
                    className="px-6 py-2 rounded-lg border border-white text-white font-semibold hover:bg-white/25 shadow transition"
                  >
                    Modifier
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg border border-white text-white font-semibold hover:bg-white/25 shadow transition"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEdit(false);
                        setForm({ ...user, password: "" });
                        setError("");
                      }}
                      className="px-6 py-2 rounded-lg border border-white text-white font-semibold hover:bg-white/25 shadow transition"
                    >
                      Annuler
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setShowDelete(true)}
                  className="ml-auto px-6 py-2 rounded-lg border border-red-600 text-red-600 font-semibold hover:bg-red-800 hover:text-white transition"
                >
                  Supprimer mon compte
                </button>
              </div>
            </form>
            {showDelete && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                <div className="bg-[#1a1d23] p-8 rounded-xl shadow-xl border border-white/10 max-w-sm w-full">
                  <div className="text-lg font-bold mb-4">Confirmer la suppression</div>
                  <div className="mb-6 text-gray-300">Cette action est irréversible. Voulez-vous vraiment supprimer votre compte ?</div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleDelete}
                      className="px-5 py-2 rounded-lg border border-red-600 text-red-600 font-semibold hover:bg-red-800 hover:text-white transition"
                    >
                      Oui, supprimer
                    </button>
                    <button
                      onClick={() => setShowDelete(false)}
                      className="px-5 py-2 rounded-lg border border-white text-white font-semibold hover:bg-white/25 transition"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {tab === "abos" && (
          <>
            <h1 className="text-xl font-bold mb-6">Mon abonnement</h1>
            <div className="flex flex-col md:flex-row gap-8">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className={`flex-1 bg-[#23283463] rounded-xl border border-white/10 shadow-lg p-6 flex flex-col gap-4 ${user.subscription === sub.id ? "ring ring-white" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-white">{sub.name}</span>
                    {user.subscription === sub.id && (
                      <span className="ml-2 px-3 py-0.5 rounded-full bg-white/20 text-xs text-white font-semibold">Actuel</span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-white">{sub.price}</div>
                  <ul className="text-gray-200 text-sm mb-4 list-disc list-inside">
                    {sub.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  {user.subscription !== sub.id && (
                    <button
                      onClick={() => handleChangeSub(sub.id)}
                      className="mt-auto px-4 py-2 rounded-lg bg-white/20 hover:bg-white/40 text-white font-semibold transition focus:outline-none"
                    >
                      Choisir cette offre
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
