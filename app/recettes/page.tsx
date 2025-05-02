"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, CookingPot, ChevronRight } from "lucide-react"
import { initialRecipes } from "@/lib/data"
import type { Recipe } from "@/lib/types"

export default function RecipesPage() {
  const router = useRouter()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Récupérer les recettes du localStorage ou utiliser les recettes initiales
    const storedRecipes = localStorage.getItem("recipes")
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes))
    } else {
      setRecipes(initialRecipes)
      localStorage.setItem("recipes", JSON.stringify(initialRecipes))
    }
  }, [])

  const deleteRecipe = (e: React.MouseEvent, id: string) => {
    e.stopPropagation() // Empêcher la navigation lors du clic sur le bouton supprimer
    if (confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== id)
      setRecipes(updatedRecipes)
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes))
    }
  }

  const navigateToRecipe = (id: string) => {
    router.push(`/recettes/${id}`)
  }

  const navigateToEdit = (e: React.MouseEvent, id: string) => {
    e.stopPropagation() // Empêcher la navigation vers la recette lors du clic sur le bouton modifier
    router.push(`/recettes/modifier/${id}`)
  }

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-chocolate-50/30 to-green-50/30 p-6 rounded-xl">
        <div>
          <h1 className="text-3xl font-bold text-chocolate-800 mb-2">Recettes de Chocolat</h1>
          <p className="text-gray-600">Découvrez nos délicieuses recettes de chocolat pour diabétiques</p>
        </div>
        <Link href="/recettes/nouvelle">
          <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Recette
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          placeholder="Rechercher par nom ou ingrédient..."
          className="pl-10 rounded-full border-chocolate-100 focus-visible:ring-chocolate-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <CookingPot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">Aucune recette trouvée</h3>
          <p className="text-gray-500 mb-6">Créez votre première recette de chocolat pour diabétiques</p>
          <Link href="/recettes/nouvelle">
            <Button className="bg-chocolate-700 hover:bg-chocolate-800">
              <Plus className="mr-2 h-4 w-4" />
              Créer une recette
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => navigateToRecipe(recipe.id)}
            >
              <div className="h-3 bg-gradient-to-r from-chocolate-600/30 to-green-600/30"></div>
              <CardHeader className="bg-white pt-6">
                <CardTitle className="text-chocolate-800 text-xl group-hover:text-chocolate-600 transition-colors">
                  {recipe.name}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {recipe.yield} mini tablettes
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2 pb-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.slice(0, 3).map((ing, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-chocolate-50 text-chocolate-700">
                      {ing.name.split(" ")[0]}
                    </Badge>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <Badge variant="secondary" className="bg-chocolate-50 text-chocolate-700">
                      +{recipe.ingredients.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
                <div className="text-sm font-medium text-chocolate-700">
                  {recipe.totalCost.toLocaleString()} Ar (total)
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-chocolate-600 h-8 w-8 p-0"
                    onClick={(e) => navigateToEdit(e, recipe.id)}
                    title="Modifier la recette"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 h-8 w-8 p-0"
                    onClick={(e) => deleteRecipe(e, recipe.id)}
                    title="Supprimer la recette"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="h-5 w-5 text-chocolate-600" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
