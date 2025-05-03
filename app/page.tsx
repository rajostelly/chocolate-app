import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Candy, Calculator, Utensils } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-14 md:space-y-20 max-w-7xl mx-auto px-4 md:px-12">
      <section className="py-16 md:py-20 text-center bg-gradient-to-r from-chocolate-50/50 to-green-50/50 rounded-[2.5rem]">
        <h1 className="text-5xl font-bold mb-6 text-chocolate-800">
          Chocolat Diabétique
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Des recettes de chocolat spécialement conçues pour les personnes
          diabétiques, sucrées à la stévia et sans compromis sur le goût.
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
          <Card className="border-3 pb-6 border-chocolate-300 ring-2 ring-chocolate-100/50 ring-offset-2  overflow-hidden h-full transition-all duration-200 ease-linear rounded-[2rem] hover:bg-chocolate-100/40 group">
            <CardHeader className="pt-6">
              <div className="bg-green-50 group-hover:bg-emerald-400 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Candy className="h-8 w-8 text-emerald-600 group-hover:text-white" />
              </div>
              <CardTitle className="text-2xl tracking-wide">
                Recettes adaptées
              </CardTitle>
              <CardDescription className="tracking-wider text-gray-700 leading-6">
                Spécialement formulées pour les personnes diabétiques.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 tracking-wide leading-6 text-pretty">
                Nos recettes sont élaborées sans sucre ajouté, en utilisant la
                stévia comme édulcorant naturel pour un plaisir gourmand sans
                culpabilité.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/calculateur" className="block">
          <Card className="border-3 pb-6 border-chocolate-300 ring-2 ring-chocolate-100/50 ring-offset-2  overflow-hidden h-full transition-all duration-200 ease-linear rounded-[2rem] hover:bg-chocolate-100/40 group">
            <CardHeader className="pt-6">
              <div className="bg-green-50 group-hover:bg-emerald-400 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calculator className="h-8 w-8 text-emerald-600 group-hover:text-white" />
              </div>
              <CardTitle className="text-2xl tracking-wide">
                Calcul de coûts
              </CardTitle>
              <CardDescription className="tracking-wider text-gray-700 leading-6">
                Gestion précise des ingrédients et des coûts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 tracking-wide leading-6 text-pretty">
                Calculez automatiquement le coût de vos recettes en fonction des
                ingrédients utilisés pour une gestion optimale de votre
                production.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/recettes" className="block">
          <Card className="border-3 pb-6 border-chocolate-300 ring-2 ring-chocolate-100/50 ring-offset-2  overflow-hidden h-full transition-all duration-200 ease-linear rounded-[2rem] hover:bg-chocolate-100/40 group">
            <CardHeader className="pt-6">
              <div className="bg-green-50 group-hover:bg-emerald-400 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Utensils className="h-8 w-8 text-emerald-600 group-hover:text-white" />
              </div>
              <CardTitle className="text-2xl tracking-wide">
                Protocoles détaillés
              </CardTitle>
              <CardDescription className="tracking-wider text-gray-700 leading-6">
                Instructions claires et précises pour chaque recette.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 tracking-wide leading-6 text-pretty">
                Suivez des protocoles de fabrication détaillés pour réussir vos
                chocolats à chaque fois et obtenir un résultat constant et de
                qualité.
              </p>
            </CardContent>
          </Card>
        </Link>
      </section>

      <section className="bg-gradient-to-r from-chocolate-50/50 to-green-50/50 px-10 md:px-16 py-10 md:py-16 rounded-[2.5rem] shadow-sm">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-chocolate-800 mb-5 tracking-wide">
            Nos Chocolats phares
          </h2>
          <p className="text-gray-700 text-lg leading-8 max-w-2xl mx-auto">
            Découvrez nos trois recettes principales, élaborées spécialement
            pour les personnes diabétiques.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <Card className="border border-chocolate-200 shadow-md rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="tracking-wide leading-8">
                Chocolat aux Baies de Goji
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 tracking-wide text-balance leading-6">
                Un délicieux chocolat noir enrichi de baies de goji et sucré à
                la stévia, offrant une expérience gustative unique.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/recettes" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-chocolate-200 text-chocolate-700 hover:bg-chocolate-600 hover:text-white tracking-wider transition-all duration-200 ease-linear"
                >
                  Voir la recette
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border border-chocolate-200 shadow-md rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="tracking-wide leading-8">
                Chocolat à la Poudre d&apos;Amande
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 tracking-wide text-balance leading-6">
                Un chocolat onctueux à la poudre d&apos;amande, parfaitement
                équilibré pour satisfaire les papilles les plus exigeantes.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/recettes" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-chocolate-200 text-chocolate-700 hover:bg-chocolate-600 hover:text-white tracking-wider transition-all duration-200 ease-linear"
                >
                  Voir la recette
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border border-chocolate-200 shadow-md rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="tracking-wide leading-8">
                Chocolat à la Stévia et Sel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 tracking-wide text-balance leading-6">
                L&apos;alliance parfaite du chocolat noir, de la stévia et
                d&apos;une touche de sel pour une expérience gustative
                surprenante.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/recettes" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-chocolate-200 text-chocolate-700 hover:bg-chocolate-600 hover:text-white tracking-wider transition-all duration-200 ease-linear"
                >
                  Voir la recette
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
