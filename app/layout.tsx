import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunu Projets",
  description: "Application de gestion de projets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="lemonade">
      <body>{children}</body>
    </html>
  );
}