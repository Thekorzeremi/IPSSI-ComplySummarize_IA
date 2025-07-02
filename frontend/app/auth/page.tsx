"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const prev = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = prev || "auto";
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        const { username, email, password, confirm, terms } = form;
        if (!username || !email || !password || !confirm) {
          return setError("Tous les champs sont requis.");
        }
        if (password !== confirm) {
          return setError("Les mots de passe ne correspondent pas.");
        }
        if (!terms) {
          return setError("Vous devez accepter les conditions d'utilisation.");
        }

        const res = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur d'inscription");

        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/chatbot");
      } else {
        const { email, password } = form;
        if (!email || !password) return setError("Email et mot de passe requis.");

        const res = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur de connexion");

        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/chatbot");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white/5 rounded-2xl shadow-xl border border-white/10 p-8 animate-fade-up">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isRegister ? "Bienvenue sur ComplySummarize" : "Ravi de vous revoir !"}
        </h2>
        {error && <div className="mb-4 text-red-400 text-sm text-center">{error}</div>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
          {isRegister && (
            <input
              name="username"
              type="text"
              placeholder="Nom d'utilisateur"
              value={form.username}
              onChange={handleChange}
              className="rounded-lg px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="rounded-lg px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            autoComplete={isRegister ? "email" : "username"}
          />
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            className="rounded-lg px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            autoComplete={isRegister ? "new-password" : "current-password"}
          />
          {isRegister && (
            <input
              name="confirm"
              type="password"
              placeholder="Confirmation du mot de passe"
              value={form.confirm}
              onChange={handleChange}
              className="rounded-lg px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              autoComplete="new-password"
            />
          )}
          {isRegister && (
            <label className="flex items-center gap-2 mt-2 text-gray-200 text-sm select-none">
              <input
                name="terms"
                type="checkbox"
                checked={form.terms}
                onChange={handleChange}
                className="accent-white w-4 h-4 rounded border border-white/20"
              />
              J'accepte les{" "}
              <Link href="#" className="underline hover:text-white">
                conditions d'utilisation
              </Link>
            </label>
          )}
          {!isRegister && (
            <div className="flex justify-between text-sm text-gray-400">
              <button
                type="button"
                className="underline cursor-pointer mt-2 hover:text-white"
                onClick={() => alert("À implémenter !")}
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-lg bg-[#acacac5e] border border-white/10 cursor-pointer text-white font-semibold shadow-lg hover:bg-[#b6b6b69c] transition focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {isRegister ? "S'inscrire" : "Se connecter"}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-300 text-sm">
          {isRegister ? (
            <>
              Déjà un compte ?{" "}
              <button className="underline cursor-pointer hover:text-white" onClick={() => setIsRegister(false)}>
                Se connecter
              </button>
            </>
          ) : (
            <>
              Pas encore de compte ?{" "}
              <button className="underline cursor-pointer hover:text-white" onClick={() => setIsRegister(true)}>
                S'inscrire
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
