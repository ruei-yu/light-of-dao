import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Light of Dao 心燈測驗",
  description: "用 15 題探索你的當下需要哪一道心之光",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-dvh">
        <main className="container-narrow py-10 sm:py-16">{children}</main>
      </body>
    </html>
  );
}
