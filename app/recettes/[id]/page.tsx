"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Printer, Cookie, CakeSlice } from "lucide-react"
import type { Recipe } from "@/lib/types"
import { initialRecipes } from "@/lib/data"

// Constantes pour les types de tablettes
const MINI_TABLET_WEIGHT = 5 // en grammes
const NORMAL_TABLET_WEIGHT = 100 // en grammes
const CONVERSION_RATIO = NORMAL_TABLET_WEIGHT / MINI_TABLET_WEIGHT // 20 mini tablettes = 1 tablette normale

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [tabletType, setTabletType] = useState<"normal" | "mini">("normal")
  const [adjustedIngredients, setAdjustedIngredients] = useState<
    Array<{ name: string; quantity: number; price: number }>
  >([])

  useEffect(() => {
    const recipeId = params.id as string

    // Récupérer les recettes du localStorage ou utiliser les recettes initiales
    const storedRecipes = localStorage.getItem("recipes")
    const recipes = storedRecipes ? JSON.parse(storedRecipes) : initialRecipes

    const foundRecipe = recipes.find((r: Recipe) => r.id === recipeId)

    if (foundRecipe) {
      setRecipe(foundRecipe)

      // Calculer les ingrédients ajustés pour les mini tablettes (5g total)
      const totalWeight = foundRecipe.ingredients.reduce((sum, ing) => sum + ing.quantity, 0)
      const scaleFactor = MINI_TABLET_WEIGHT / totalWeight

      const miniIngredients = foundRecipe.ingredients.map((ing) => ({
        name: ing.name,
        quantity: ing.quantity * scaleFactor,
        price: ing.price,
      }))

      setAdjustedIngredients(miniIngredients)
    } else {
      // Rediriger si la recette n'existe pas
      router.push("/recettes")
    }

    setLoading(false)
  }, [params.id, router])

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-64 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-6 w-40 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return <div className="text-center py-12">Recette non trouvée</div>
  }

  // Calculer les ingrédients en fonction du type de tablette sélectionné
  const displayIngredients =
    tabletType === "mini"
      ? adjustedIngredients
      : adjustedIngredients.map((ing) => ({
          name: ing.name,
          quantity: ing.quantity * CONVERSION_RATIO,
          price: ing.price,
        }))

  // Calculer le coût total des ingrédients affichés
  const displayTotalCost = displayIngredients.reduce((sum, ing) => {
    return sum + (ing.quantity * ing.price) / 1000
  }, 0)

  // Calculer le poids total des ingrédients affichés
  const displayTotalWeight = displayIngredients.reduce((sum, ing) => sum + ing.quantity, 0)

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <Link href="/recettes">
          <Button variant="ghost" className="text-chocolate-700 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour aux recettes
          </Button>
        </Link>
        <div className="flex space-x-2">
          <Link href={`/recettes/modifier/${recipe.id}`}>
            <Button variant="outline" className="border-chocolate-200 text-chocolate-700">
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </Link>
          <Button variant="outline" className="border-green-200 text-green-700" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-chocolate-50/30 to-green-50/30 p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-chocolate-800 mb-3">{recipe.name}</h1>
        {recipe.description && <p className="text-gray-700 mb-6 max-w-3xl leading-relaxed">{recipe.description}</p>}

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
          <h3 className="text-lg font-medium text-chocolate-800 mb-3">Format de tablette</h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant={tabletType === "normal" ? "default" : "outline"}
              className={`flex-1 h-auto py-4 ${
                tabletType === "normal"
                  ? "bg-chocolate-700 hover:bg-chocolate-800"
                  : "border-2 border-gray-200 hover:border-chocolate-300"
              }`}
              onClick={() => setTabletType("normal")}
            >
              <div className="flex flex-col items-center">
                <CakeSlice
                  className={`h-8 w-8 mb-2 ${tabletType === "normal" ? "text-white" : "text-chocolate-700"}`}
                />
                <span
                  className={`text-lg font-medium ${tabletType === "normal" ? "text-white" : "text-chocolate-800"}`}
                >
                  Tablette normale
                </span>
                <span className={`text-sm ${tabletType === "normal" ? "text-white/80" : "text-gray-600"}`}>100g</span>
              </div>
            </Button>

            <Button
              variant={tabletType === "mini" ? "default" : "outline"}
              className={`flex-1 h-auto py-4 ${
                tabletType === "mini"
                  ? "bg-chocolate-700 hover:bg-chocolate-800"
                  : "border-2 border-gray-200 hover:border-chocolate-300"
              }`}
              onClick={() => setTabletType("mini")}
            >
              <div className="flex flex-col items-center">
                <Cookie className={`h-8 w-8 mb-2 ${tabletType === "mini" ? "text-white" : "text-chocolate-700"}`} />
                <span className={`text-lg font-medium ${tabletType === "mini" ? "text-white" : "text-chocolate-800"}`}>
                  Mini tablette
                </span>
                <span className={`text-sm ${tabletType === "mini" ? "text-white/80" : "text-gray-600"}`}>5g</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1">
            {tabletType === "mini" ? "Mini tablette de 5g" : "Tablette normale de 100g"}
          </Badge>
          <Badge className="bg-chocolate-100 text-chocolate-800 hover:bg-chocolate-200 px-3 py-1">
            Coût: {Math.round(displayTotalCost).toLocaleString()} Ar
          </Badge>
          <Badge className="bg-chocolate-100 text-chocolate-800 hover:bg-chocolate-200 px-3 py-1">
            Rendement: {recipe.yield} {tabletType === "mini" ? "mini tablettes" : "tablettes"}
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-2 bg-chocolate-600/30"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-chocolate-800 flex items-center">
              <span className="bg-chocolate-100 text-chocolate-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                1
              </span>
              Ingrédients pour {tabletType === "mini" ? "une mini tablette (5g)" : "une tablette normale (100g)"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {displayIngredients.map((ingredient, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">{ingredient.name}</span>
                  <div className="flex gap-4">
                    <span className="text-gray-600">
                      {Math.round((ingredient.quantity * ingredient.price) / 1000).toLocaleString()} Ar
                    </span>
                    <span className="text-gray-600 w-16 text-right">{ingredient.quantity.toFixed(2)} g</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-3 font-medium text-chocolate-700">
                <span>Total</span>
                <div className="flex gap-4">
                  <span>{Math.round(displayTotalCost).toLocaleString()} Ar</span>
                  <span className="w-16 text-right">{displayTotalWeight.toFixed(1)} g</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-2 bg-green-600/30"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-green-800 flex items-center">
              <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                2
              </span>
              Protocole de fabrication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 pl-0">
              {recipe.protocol.map((step, index) => (
                <li key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-medium text-green-700">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-chocolate-600/30 to-green-600/30"></div>
        <CardHeader>
          <CardTitle className="text-chocolate-800">Informations de production</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50/30 p-4 rounded-lg border border-green-100">
              <div className="text-sm text-green-700 mb-1">Format de tablette</div>
              <div className="text-2xl font-bold text-green-800">
                {tabletType === "mini" ? "Mini tablette (5g)" : "Tablette normale (100g)"}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {tabletType === "mini"
                  ? "Pour faire une tablette normale, multipliez les quantités par 20"
                  : "Pour faire une mini tablette, divisez les quantités par 20"}
              </div>
            </div>
            <div className="bg-chocolate-50/30 p-4 rounded-lg border border-chocolate-100">
              <div className="text-sm text-chocolate-700 mb-1">Coût par tablette</div>
              <div className="text-2xl font-bold text-chocolate-800">
                {Math.round(displayTotalCost).toLocaleString()} Ar
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Pour {tabletType === "mini" ? "une mini tablette de 5g" : "une tablette normale de 100g"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
