import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Light of Dao",
  description: "心燈測驗 · 找回內在的明",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
