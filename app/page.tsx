import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Candy, Calculator, Utensils } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="py-16 text-center bg-gradient-to-r from-chocolate-50/30 to-green-50/30 rounded-2xl">
        <h1 className="text-5xl font-bold mb-6 text-chocolate-800">Chocolat Diabétique</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Des recettes de chocolat spécialement conçues pour les personnes diabétiques, sucrées à la stévia et sans
          compromis sur le goût.
        </p>
        <div className="mt-10">
          <Link href="/recettes">
            <Button className="bg-chocolate-700 hover:bg-chocolate-800 rounded-full px-8 py-6 text-lg h-auto">
              Découvrir nos recettes
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 py-8">
        <Link href="/recettes" className="block">
          <Card className="border-none shadow-md overflow-hidden h-full hover:shadow-lg transition-all duration-300">
            <div className="h-2 bg-green-600/30"></div>
            <CardHeader className="pt-6">
              <div className="bg-green-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Candy className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Recettes Adaptées</CardTitle>
              <CardDescription>Spécialement formulées pour les personnes diabétiques</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-gray-700">
                Nos recettes sont élaborées sans sucre ajouté, en utilisant la stévia comme édulcorant naturel pour un
                plaisir gourmand sans culpabilité.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/calculateur" className="block">
          <Card className="border-none shadow-md overflow-hidden h-full hover:shadow-lg transition-all duration-300">
            <div className="h-2 bg-chocolate-600/30"></div>
            <CardHeader className="pt-6">
              <div className="bg-chocolate-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calculator className="h-8 w-8 text-chocolate-600" />
              </div>
              <CardTitle className="text-xl">Calcul de Coûts</CardTitle>
              <CardDescription>Gestion précise des ingrédients et des coûts</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-gray-700">
                Calculez automatiquement le coût de vos recettes en fonction des ingrédients utilisés pour une gestion
                optimale de votre production.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/recettes" className="block">
          <Card className="border-none shadow-md overflow-hidden h-full hover:shadow-lg transition-all duration-300">
            <div className="h-2 bg-green-600/30"></div>
            <CardHeader className="pt-6">
              <div className="bg-green-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Utensils className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Protocoles Détaillés</CardTitle>
              <CardDescription>Instructions précises pour chaque recette</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-gray-700">
                Suivez des protocoles de fabrication détaillés pour réussir vos chocolats à chaque fois et obtenir un
                résultat constant et de qualité.
              </p>
            </CardContent>
          </Card>
        </Link>
      </section>

      <section className="bg-gradient-to-r from-chocolate-50/30 to-green-50/30 p-10 rounded-xl shadow-sm">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-chocolate-800 mb-3">Nos Chocolats Phares</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos trois recettes principales, élaborées spécialement pour les personnes diabétiques
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="h-2 bg-chocolate-600/30"></div>
            <CardHeader>
              <CardTitle>Chocolat aux Baies de Goji</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Un délicieux chocolat noir enrichi de baies de goji et sucré à la stévia, offrant une expérience
                gustative unique.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/recettes" className="w-full">
                <Button variant="outline" className="w-full border-chocolate-200 text-chocolate-700">
                  Voir la recette
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="h-2 bg-chocolate-600/30"></div>
            <CardHeader>
              <CardTitle>Chocolat à la Poudre d&apos;Amande</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Un chocolat onctueux à la poudre d&apos;amande, parfaitement équilibré pour satisfaire les papilles les
                plus exigeantes.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/recettes" className="w-full">
                <Button variant="outline" className="w-full border-chocolate-200 text-chocolate-700">
                  Voir la recette
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="h-2 bg-chocolate-600/30"></div>
            <CardHeader>
              <CardTitle>Chocolat à la Stévia et Sel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                L&apos;alliance parfaite du chocolat noir, de la stévia et d&apos;une touche de sel pour une expérience
                gustative surprenante.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/recettes" className="w-full">
                <Button variant="outline" className="w-full border-chocolate-200 text-chocolate-700">
                  Voir la recette
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
