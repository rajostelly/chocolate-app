"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Cookie, CakeSlice, Trash2 } from "lucide-react";
import { useRecipe, useDeleteRecipe } from "@/hooks/use-recipes";
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

// Constantes pour les types de tablettes
const MINI_TABLET_WEIGHT = 5; // en grammes
const NORMAL_TABLET_WEIGHT = 100; // en grammes
const CONVERSION_RATIO = NORMAL_TABLET_WEIGHT / MINI_TABLET_WEIGHT; // 20 mini tablettes = 1 tablette normale

export default function RecipeDetail({ recipeId }: { recipeId: string }) {
  const router = useRouter();
  const { data: recipe, isLoading, error } = useRecipe(recipeId);
  const deleteRecipeMutation = useDeleteRecipe();
  const [tabletType, setTabletType] = useState<"normal" | "mini">("normal");
  const [adjustedIngredients, setAdjustedIngredients] = useState<
    Array<{ name: string; quantity: number; price: number }>
  >([]);

  // Calculate adjusted ingredients when recipe data is loaded
  useState(() => {
    if (recipe) {
      // Calculer les ingrédients ajustés pour les mini tablettes (5g total)
      const totalWeight = recipe.ingredients.reduce(
        (sum, ing) => sum + ing.quantity,
        0
      );
      const scaleFactor = MINI_TABLET_WEIGHT / totalWeight;

      const miniIngredients = recipe.ingredients.map((ing) => ({
        name: ing.name,
        quantity: ing.quantity * scaleFactor,
        price: ing.price,
      }));

      setAdjustedIngredients(miniIngredients);
    }
  });

  const handleDeleteRecipe = async () => {
    try {
      await deleteRecipeMutation.mutateAsync(recipeId);
      router.push("/recettes");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Chargement de la recette...</div>;
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">
          Erreur lors du chargement de la recette ou recette non trouvée.
        </p>
        <Link href="/recettes">
          <Button variant="outline">Retour aux recettes</Button>
        </Link>
      </div>
    );
  }

  // Calculer les ingrédients en fonction du type de tablette sélectionné
  const displayIngredients =
    tabletType === "mini"
      ? adjustedIngredients
      : adjustedIngredients.map((ing) => ({
          name: ing.name,
          quantity: ing.quantity * CONVERSION_RATIO,
          price: ing.price,
        }));

  // Calculer le coût total des ingrédients affichés
  const displayTotalCost = displayIngredients.reduce((sum, ing) => {
    return sum + (ing.quantity * ing.price) / 1000;
  }, 0);

  // Calculer le poids total des ingrédients affichés
  const displayTotalWeight = displayIngredients.reduce(
    (sum, ing) => sum + ing.quantity,
    0
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <Link href="/recettes">
          <Button variant="ghost" className="text-chocolate-700 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour aux recettes
          </Button>
        </Link>
        <div className="flex space-x-2 pr-4">
          <Link href={`/recettes/modifier/${recipe.id}`}>
            <Button
              variant="outline"
              className="border-chocolate-200 text-chocolate-700"
            >
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-red-200 text-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
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
                  onClick={handleDeleteRecipe}
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="bg-gradient-to-r from-chocolate-50/50 to-green-50/50 rounded-[2.5rem] p-8 md:p-16">
        <h1 className="text-3xl font-bold text-chocolate-800 mb-3 tracking-wide">
          {recipe.name}
        </h1>
        {recipe.description && (
          <p className="text-gray-700 mb-6 max-w-3xl leading-relaxed tracking-wider">
            {recipe.description}
          </p>
        )}

        <div className="mb-4 mt-8">
          <h3 className="text-lg font-medium text-chocolate-800 mb-3">
            Format de tablette :
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant={tabletType === "normal" ? "default" : "outline"}
              className={`flex-1 h-fit relative ${
                tabletType === "normal"
                  ? "bg-chocolate-700 hover:bg-chocolate-800"
                  : "border-2 border-gray-200 hover:border-chocolate-300"
              }`}
              onClick={() => setTabletType("normal")}
            >
              <div className="flex w-full h-16 flex-row items-center justify-center gap-3">
                <CakeSlice
                  className={`size-20 mb-2 block translate-y-1 ${
                    tabletType === "normal"
                      ? "text-white"
                      : "text-chocolate-700"
                  }`}
                />
                <span
                  className={`text-lg font-medium tracking-wider ${
                    tabletType === "normal"
                      ? "text-white"
                      : "text-chocolate-800"
                  }`}
                >
                  Tablette normale (&nbsp;100g&nbsp;)
                </span>
              </div>
            </Button>

            <Button
              variant={tabletType === "mini" ? "default" : "outline"}
              className={`flex-1 h-fit relative ${
                tabletType === "mini"
                  ? "bg-chocolate-700 hover:bg-chocolate-800"
                  : "border-2 border-gray-200 hover:border-chocolate-300"
              }`}
              onClick={() => setTabletType("mini")}
            >
              <div className="flex w-full h-16 flex-row items-center justify-center gap-3">
                <Cookie
                  className={`size-20 mb-2 block translate-y-1 ${
                    tabletType === "mini" ? "text-white" : "text-chocolate-700"
                  }`}
                />
                <span
                  className={`text-lg font-medium tracking-wider ${
                    tabletType === "mini" ? "text-white" : "text-chocolate-800"
                  }`}
                >
                  Mini tablette (&nbsp;5g&nbsp;)
                </span>
              </div>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 tracking-wider">
            {tabletType === "mini"
              ? "Mini tablette de 5g"
              : "Tablette normale de 100g"}
          </Badge>
          <Badge className="bg-chocolate-100 text-chocolate-800 hover:bg-chocolate-200 px-4 py-2 tracking-wider">
            Coût: {Math.round(displayTotalCost).toLocaleString()} Ar
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border border-chocolate-200 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-chocolate-800 flex items-start gap-3 tracking-wide leading-9 flex-col">
              <span className="bg-chocolate-100 text-chocolate-800  w-8 h-8 rounded-full flex items-center justify-center">
                1
              </span>
              Ingrédients pour{" "}
              {tabletType === "mini"
                ? "une mini tablette (5g)"
                : "une tablette normale (100g)"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {displayIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b border-gray-100"
                >
                  <span className="font-medium">{ingredient.name}</span>
                  <div className="flex gap-4">
                    <span className="text-gray-600">
                      {Math.round(
                        (ingredient.quantity * ingredient.price) / 1000
                      ).toLocaleString()}{" "}
                      Ar
                    </span>
                    <span className="text-gray-600 w-16 text-right">
                      {ingredient.quantity.toFixed(2)} g
                    </span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-3 font-medium text-chocolate-700">
                <span>Total</span>
                <div className="flex gap-4">
                  <span>
                    {Math.round(displayTotalCost).toLocaleString()} Ar
                  </span>
                  <span className="w-16 text-right">
                    {displayTotalWeight.toFixed(1)} g
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-chocolate-200 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-emerald-700 flex items-start gap-3 tracking-wide leading-9 flex-col">
              <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center">
                2
              </span>
              Protocole de fabrication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 pl-0">
              {recipe.protocol.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 pb-3 border-b border-gray-100"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-medium text-emerald-700">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-chocolate-200 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-chocolate-700 tracking-wide leading-9">
            Informations de production
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 tracking-wide">
            <div className="bg-emerald-50/30 p-4 rounded-lg border border-emerald-100">
              <div className="text-sm text-emerald-700 mb-1">
                Format de tablette :
              </div>
              <div className="text-2xl font-bold text-emerald-800">
                {tabletType === "mini"
                  ? "Mini tablette (5g)"
                  : "Tablette normale (100g)"}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {tabletType === "mini"
                  ? "Pour faire une tablette normale, multipliez les quantités par 20"
                  : "Pour faire une mini tablette, divisez les quantités par 20"}
              </div>
            </div>
            <div className="bg-chocolate-50/30 p-4 rounded-lg border border-chocolate-100">
              <div className="text-sm text-chocolate-700 mb-1">
                Coût par tablette :
              </div>
              <div className="text-2xl font-bold text-chocolate-800">
                {Math.round(displayTotalCost).toLocaleString()} Ar
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Pour{" "}
                {tabletType === "mini"
                  ? "une mini tablette de 5g"
                  : "une tablette normale de 100g"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
