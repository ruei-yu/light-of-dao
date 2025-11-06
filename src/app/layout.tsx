// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Light of Dao",
  description: "心燈測驗・找回內在的明",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
