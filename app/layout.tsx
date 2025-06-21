import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chocolat Diabétique",
  description:
    "Application de gestion de recettes de chocolat pour diabétiques",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-800`}>
        <Providers>
          <Navbar />
          <main className="container mx-auto px-4 py-12">{children}</main>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
