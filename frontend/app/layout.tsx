import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ComplySummarize",
  description: "Gagnez un temps précieux dans l’analyse de vos documents réglementaires grâce à l’IA. Résumez, synthétisez et exploitez l’essentiel en quelques secondes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative overflow-x-hidden`}
        style={{ paddingTop: 72 }}
      >
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#0d1117] via-[#171b22] to-[#2d2f36] animate-gradient-move"
          style={{ minHeight: '100vh' }}
        >
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-60 bg-gradient-to-tr from-[#6e40c9] via-[#3572a5] to-[#f5f6fa] animate-pulse-slow" />
          <div className="absolute left-1/3 top-2/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[220px] rounded-full blur-2xl opacity-40 bg-gradient-to-tr from-[#3572a5] to-[#6e40c9] animate-pulse-slower" />
        </div>
        {require('./Topbar').default()}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
