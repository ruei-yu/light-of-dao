
import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "心燈測驗 · Light of Dao",
  description: "透過 15 題，照見此刻的心境，看看求道能帶給你什麼幫助。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-dvh antialiased text-zinc-800">{children}</body>
    </html>
  );
}
