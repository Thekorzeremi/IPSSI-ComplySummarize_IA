import Link from "next/link";

export default function Topbar() {
  return (
    <header className="w-full flex items-center justify-between px-6 h-16 bg-[#f6f8fa] border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#24292f" />
            <text x="16" y="21" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="monospace">CS</text>
          </svg>
          <span className="font-semibold text-lg text-gray-900 tracking-tight select-none">ComplySummarize</span>
        </span>
      </div>
      <nav className="flex items-center gap-2">
        <Link href="/signup" className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">S'inscrire</Link>
        <Link href="/login" className="px-4 py-1.5 rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100 transition-colors">Se connecter</Link>
      </nav>
    </header>
  );
}
