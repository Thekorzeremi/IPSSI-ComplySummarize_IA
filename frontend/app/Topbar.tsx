"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, History, Home } from "lucide-react";
import TopbarUserMenu from "./TopbarUserMenu";

export default function Topbar() {
  return (
    <header className="w-full flex items-center justify-between px-6 h-16 bg-transparent backdrop-blur-xl border-b border-gray-200/20 fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => window.location.href = "/"}>
        <span className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#24292f" />
            <text x="16" y="21" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="monospace">CS</text>
          </svg>
          <span className="font-semibold text-lg text-gray-200 tracking-tight select-none">ComplySummarize</span>
        </span>
      </div>
      <nav className="flex items-center gap-2">
        {usePathname() === "/auth" || usePathname() === "/" ? (<></>) : (
          <>
            {usePathname() === "/chatbot" ? (
              <Link href="/history" className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-200  border border-gray-300 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400" title="Historique">
                <History className="w-5 h-5 text-gray-200" />
                <span className="text-gray-200">Historique</span>
              </Link>
            ) : (
              <Link href="/chatbot" className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-200  border border-gray-300 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400" title="Chatbot">
                <MessageSquare className="w-5 h-5 text-gray-200" />
                <span className="text-gray-200">Chatbot</span>
              </Link>
            )}
            <TopbarUserMenu />
          </>
        )}
      </nav>
    </header>
  );
}
