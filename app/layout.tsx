import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TODOアプリ",
  description: "Next.jsで作成したTODOアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
        {children}
      </body>
    </html>
  );
}
