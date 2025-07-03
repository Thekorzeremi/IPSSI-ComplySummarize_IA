"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Autorise seulement / et /auth sans connexion
    if (pathname === "/" || pathname.startsWith("/auth")) return;
    const stored = typeof window !== "undefined" && localStorage.getItem("user");
    if (!stored) {
      router.replace("/auth");
    }
  }, [router, pathname]);
}
