import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunset Rider Shop - Votre boutique en ligne",
  description: "Découvrez notre sélection de produits de qualité",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
