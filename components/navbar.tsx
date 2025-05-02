"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, CookingPot, Calculator } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-chocolate-700">ChocoDiab</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-1">
            <Link href="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className={isActive("/") ? "bg-chocolate-700 text-white" : "text-gray-700"}
              >
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Button>
            </Link>

            <Link href="/recettes">
              <Button
                variant={isActive("/recettes") ? "default" : "ghost"}
                className={isActive("/recettes") ? "bg-chocolate-700 text-white" : "text-gray-700"}
              >
                <CookingPot className="mr-2 h-4 w-4" />
                Recettes
              </Button>
            </Link>

            <Link href="/calculateur">
              <Button
                variant={isActive("/calculateur") ? "default" : "ghost"}
                className={isActive("/calculateur") ? "bg-chocolate-700 text-white" : "text-gray-700"}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculateur
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
