"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, ChevronDown } from "lucide-react";

interface UserData {
  username: string;
  email: string;
}

export default function TopbarUserMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Erreur parsing localStorage user:", e);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-200 hover:cursor-pointer  border border-gray-300 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <User className="w-5 h-5" />
        <span>{user?.username || "Utilisateur"}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      {open && (
        <div className="absolute right-0 w-48 rounded-md shadow-lg bg-gray-800/20 mt-8 border border-gray-700 z-50">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-gray-700 rounded-t-md transition-colors"
            onClick={() => setOpen(false)}
          >
            <User className="w-4 h-4" /> Mon profil
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-700 rounded-b-md transition-colors"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
