"use client";

import type React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  CookingPot,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useRecipes, useDeleteRecipe } from "@/hooks/use-recipes";
import type { RecipeWithIngredients } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function RecipeList() {
  const router = useRouter();
  const { data: recipes = [], isLoading, error } = useRecipes();
  const deleteRecipeMutation = useDeleteRecipe();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteRecipe = async (id: string) => {
    try {
      await deleteRecipeMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const navigateToRecipe = (id: string) => {
    router.push(`/recettes/${id}`);
  };

  const navigateToEdit = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    router.push(`/recettes/modifier/${id}`);
  };

  const filteredRecipes = recipes.filter(
    (recipe: RecipeWithIngredients) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (isLoading) {
    return <div className="text-center py-12">Chargement des recettes...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Erreur lors du chargement des recettes. Veuillez réessayer.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <Link href="/recettes/nouvelle">
          <Button className="bg-chocolate-700 hover:bg-chocolate-800 rounded-full px-6 py-4 text-base tracking-wider h-auto">
            <Plus className="size-6" />
            Nouvelle recette
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md mx-auto mt-6 flex gap-4">
        <div className="absolute inset-y-0 left-0 pl-8 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          placeholder="Rechercher par nom ou ingrédient..."
          className="pl-16 rounded-full placeholder:tracking-wide h-14 border-chocolate-100 focus-visible:ring-chocolate-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <CookingPot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            Aucune recette trouvée
          </h3>
          <p className="text-gray-500 mb-6">
            Créez votre première recette de chocolat pour diabétiques
          </p>
          <Link href="/recettes/nouvelle">
            <Button className="bg-chocolate-700 hover:bg-chocolate-800">
              <Plus className="mr-2 h-4 w-4" />
              Créer une recette
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe: RecipeWithIngredients) => (
            <Card
              key={recipe.id}
              className="border-3 pb-6 border-chocolate-300 ring-2 ring-chocolate-100/50 ring-offset-2 overflow-hidden transition-all duration-200 ease-linear cursor-pointer rounded-[2rem] hover:bg-chocolate-100/40 group"
              onClick={() => navigateToRecipe(recipe.id)}
            >
              <CardHeader className="pt-6">
                <CardTitle className="text-chocolate-800 text-xl tracking-wide group-hover:text-chocolate-500 transition-colors">
                  {recipe.name}
                </CardTitle>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-emerald-100 tracking-wide"
                  >
                    {recipe.yield} mini tablettes
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2 pb-4">
                <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-6 tracking-wide">
                  {recipe.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.slice(0, 3).map((ing, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-chocolate-50 text-chocolate-700 group-hover:bg-white"
                    >
                      {ing.name.split(" ")[0]}
                    </Badge>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="bg-chocolate-50 text-chocolate-700 group-hover:bg-white"
                    >
                      +{recipe.ingredients.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <div className="px-6 py-3 flex justify-between items-center">
                <div className="text-lg font-bold text-chocolate-700 pl-1">
                  {Math.round(recipe.totalCost).toLocaleString()} Ar (total)
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                        title="Supprimer la recette"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action ne peut pas être annulée. Cela supprimera
                          définitivement la recette.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleDeleteRecipe(recipe.id)}
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="h-5 w-5 text-chocolate-600" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
