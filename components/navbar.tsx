"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, CookingPot, Calculator } from "lucide-react";
import Image from "next/image";
import ispm from "@/public/ispm.jpeg";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 maw-w-7xl mx-auto px-4 md:px-12">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 justify-center">
            <Image
              src={ispm}
              alt="ispm logo"
              className="h-12"
              width={48}
              height={48}
            />
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-chocolate-700">
                ChocoDiab
              </span>
            </Link>
          </div>

          <nav className="flex items-center space-x-8 tracking-wider">
            <Link href="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className={
                  isActive("/")
                    ? "bg-chocolate-700 text-white"
                    : "text-gray-700"
                }
              >
                <Home className="h-4 w-4" />
                Accueil
              </Button>
            </Link>

            <Link href="/recettes">
              <Button
                variant={isActive("/recettes") ? "default" : "ghost"}
                className={
                  isActive("/recettes")
                    ? "bg-chocolate-700 text-white"
                    : "text-gray-700"
                }
              >
                <CookingPot className="h-4 w-4" />
                Recettes
              </Button>
            </Link>

            <Link href="/calculateur">
              <Button
                variant={isActive("/calculateur") ? "default" : "ghost"}
                className={
                  isActive("/calculateur")
                    ? "bg-chocolate-700 text-white"
                    : "text-gray-700"
                }
              >
                <Calculator className="h-4 w-4" />
                Calculateur
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
