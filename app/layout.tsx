import type React from "react";
import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/providers";

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
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="container mx-auto px-4 py-12">{children}</main>
            <Toaster position="top-right" />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
