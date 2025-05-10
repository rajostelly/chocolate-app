"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, HelpCircle, Cookie, CakeSlice } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecipes } from "@/hooks/use-recipes";
import type { RecipeWithIngredients } from "@/types";
import { MINI_TABLET_WEIGHT, CONVERSION_RATIO } from "@/constants";
import { toast } from "react-hot-toast";

export default function CalculatorClient() {
  const { data: recipes = [], isLoading, error } = useRecipes();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] =
    useState<RecipeWithIngredients | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [calculatedIngredients, setCalculatedIngredients] = useState<
    Array<{ name: string; quantity: number; price: number }>
  >([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [tabletType, setTabletType] = useState<"normal" | "mini">("normal");
  const [adjustedIngredients, setAdjustedIngredients] = useState<
    Array<{ name: string; quantity: number; price: number }>
  >([]);

  // Show error toast if there's an error loading recipes
  useEffect(() => {
    if (error) {
      toast.error(
        "Erreur lors du chargement des recettes. Veuillez réessayer."
      );
    }
  }, [error]);

  // Mettre à jour la recette sélectionnée
  useEffect(() => {
    if (selectedRecipeId) {
      const recipe = recipes.find((r) => r.id === selectedRecipeId);
      setSelectedRecipe(recipe || null);

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
        calculateCosts(miniIngredients, quantity, tabletType);
      }
    } else {
      setSelectedRecipe(null);
      setAdjustedIngredients([]);
      setCalculatedIngredients([]);
      setTotalCost(0);
    }
  }, [selectedRecipeId, recipes]);

  // Calculer les coûts lorsque la quantité ou le type de tablette change
  useEffect(() => {
    if (adjustedIngredients.length > 0) {
      calculateCosts(adjustedIngredients, quantity, tabletType);
    }
  }, [quantity, tabletType]);

  const calculateCosts = (
    baseIngredients: Array<{ name: string; quantity: number; price: number }>,
    chocolateQuantity: number,
    type: "normal" | "mini"
  ) => {
    // Ajuster la quantité en fonction du type de tablette
    const adjustmentFactor = type === "normal" ? CONVERSION_RATIO : 1;

    // Calculer les quantités et coûts pour le nombre de chocolats demandé
    const adjustedIngredients = baseIngredients.map((ingredient) => {
      const adjustedQuantity =
        ingredient.quantity * adjustmentFactor * chocolateQuantity;
      const adjustedPrice = (adjustedQuantity * ingredient.price) / 1000;
      return {
        name: ingredient.name,
        quantity: adjustedQuantity,
        price: adjustedPrice,
      };
    });

    // Calculer le coût total
    const total = adjustedIngredients.reduce((sum, ing) => sum + ing.price, 0);

    setCalculatedIngredients(adjustedIngredients);
    setTotalCost(total);
  };

  // Calculer le coût unitaire pour une mini tablette
  const getMiniTabletCost = (
    baseIngredients: Array<{ name: string; quantity: number; price: number }>
  ) => {
    return baseIngredients.reduce(
      (sum, ing) => sum + (ing.quantity * ing.price) / 1000,
      0
    );
  };

  // Calculer le coût unitaire pour une tablette normale
  const getNormalTabletCost = (
    baseIngredients: Array<{ name: string; quantity: number; price: number }>
  ) => {
    return baseIngredients.reduce(
      (sum, ing) => sum + (ing.quantity * CONVERSION_RATIO * ing.price) / 1000,
      0
    );
  };

  if (isLoading) {
    return <div className="text-center py-12">Chargement des recettes...</div>;
  }

  return (
    <>
      <Card className="border-dashed border-2 border-green-200 bg-green-50/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="h-6 w-6 text-green-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-green-800 mb-1 mt-1">
                Comment utiliser le calculateur ?
              </h3>
              <ol className="text-sm text-gray-700 space-y-2 list-decimal pl-5">
                <li>Sélectionnez une recette dans la liste déroulante</li>
                <li>
                  Choisissez le format de tablette (normale 100g ou mini 5g)
                </li>
                <li>
                  Indiquez le nombre de tablettes que vous souhaitez produire
                </li>
                <li>
                  Le calculateur affichera automatiquement les quantités
                  d'ingrédients nécessaires et le coût total
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 tracking-wide">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-chocolate-700 tracking-wide">
              Paramètres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipe" className="tracking-wide">
                Sélectionner une recette
              </Label>
              <Select
                value={selectedRecipeId}
                onValueChange={setSelectedRecipeId}
              >
                <SelectTrigger
                  id="recipe"
                  className="border-2 focus:border-chocolate-300"
                >
                  <SelectValue placeholder="Choisir une recette" />
                </SelectTrigger>
                <SelectContent>
                  {recipes.map((recipe) => (
                    <SelectItem key={recipe.id} value={recipe.id}>
                      {recipe.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedRecipe && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="tracking-wide">Format de tablette</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={tabletType === "normal" ? "default" : "outline"}
                      className={`h-auto py-3 ${
                        tabletType === "normal"
                          ? "bg-chocolate-700 hover:bg-chocolate-800"
                          : "border-2 border-gray-200 hover:border-chocolate-300"
                      }`}
                      onClick={() => setTabletType("normal")}
                    >
                      <div className="flex flex-col items-center w-full">
                        <CakeSlice
                          className={`h-6 w-6 mb-1 ${
                            tabletType === "normal"
                              ? "text-white"
                              : "text-chocolate-700"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium tracking-wide ${
                            tabletType === "normal"
                              ? "text-white"
                              : "text-chocolate-800"
                          }`}
                        >
                          Normale (100g)
                        </span>
                      </div>
                    </Button>

                    <Button
                      type="button"
                      variant={tabletType === "mini" ? "default" : "outline"}
                      className={`h-auto py-3 ${
                        tabletType === "mini"
                          ? "bg-chocolate-700 hover:bg-chocolate-800"
                          : "border-2 border-gray-200 hover:border-chocolate-300"
                      }`}
                      onClick={() => setTabletType("mini")}
                    >
                      <div className="flex flex-col items-center w-full">
                        <Cookie
                          className={`h-6 w-6 mb-1 ${
                            tabletType === "mini"
                              ? "text-white"
                              : "text-chocolate-700"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            tabletType === "mini"
                              ? "text-white"
                              : "text-chocolate-800"
                          }`}
                        >
                          Mini (5g)
                        </span>
                      </div>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">
                    Nombre de{" "}
                    {tabletType === "mini"
                      ? "mini tablettes"
                      : "tablettes normales"}{" "}
                    à produire
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Number.parseInt(e.target.value) || 1)
                    }
                    className="border-2 focus:border-chocolate-300"
                  />
                </div>

                {adjustedIngredients.length > 0 && (
                  <div className="pt-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100 leading-6">
                    <p className="font-medium text-chocolate-700 mb-1">
                      Informations sur la recette:
                    </p>
                    <p>
                      <b>Nom: </b> {selectedRecipe.name}
                    </p>
                    <p>
                      <b> Coût unitaire mini tablette (5g): </b>
                      {Math.round(
                        getMiniTabletCost(adjustedIngredients)
                      ).toLocaleString()}{" "}
                      Ar
                    </p>
                    <p>
                      <b> Coût unitaire tablette normale (100g): </b>
                      {Math.round(
                        getNormalTabletCost(adjustedIngredients)
                      ).toLocaleString()}{" "}
                      Ar
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-chocolate-700 tracking-wide">
              Résultats du calcul
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedRecipe ? (
              <div className="text-center py-8 text-gray-700 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <Calculator className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p>Veuillez sélectionner une recette pour voir les calculs</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-medium text-lg text-gray-700 mb-2">
                    Ingrédients nécessaires pour {quantity}{" "}
                    {tabletType === "mini"
                      ? "mini tablette(s) de 5g"
                      : "tablette(s) normale(s) de 100g"}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-gray-600">
                            Ingrédient
                          </th>
                          <th className="text-right py-2 text-gray-600">
                            Quantité (g)
                          </th>
                          <th className="text-right py-2 text-gray-600">
                            Coût (Ar)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculatedIngredients.map((ingredient, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2">{ingredient.name}</td>
                            <td className="text-right py-2">
                              {ingredient.quantity.toFixed(2)}
                            </td>
                            <td className="text-right py-2">
                              {Math.round(ingredient.price).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                        <tr className="font-medium text-chocolate-700">
                          <td className="py-2">Total</td>
                          <td className="text-right py-2 ">
                            {calculatedIngredients
                              .reduce((sum, ing) => sum + ing.quantity, 0)
                              .toFixed(2)}{" "}
                            g
                          </td>
                          <td className="text-right py-2">
                            {Math.round(totalCost).toLocaleString()} Ar
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-chocolate-50/30 p-4 rounded-lg border border-chocolate-100">
                    <div className="text-sm text-chocolate-700 mb-1">
                      Coût unitaire
                    </div>
                    <div className="text-xl font-bold text-chocolate-800">
                      {Math.round(totalCost / quantity).toLocaleString()} Ar
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Par{" "}
                      {tabletType === "mini"
                        ? "mini tablette de 5g"
                        : "tablette normale de 100g"}
                    </div>
                  </div>
                  <div className="bg-green-50/30 p-4 rounded-lg border border-green-100">
                    <div className="text-sm text-green-700 mb-1">
                      Coût total pour {quantity}{" "}
                      {tabletType === "mini"
                        ? "mini tablette(s)"
                        : "tablette(s) normale(s)"}
                    </div>
                    <div className="text-xl font-bold text-green-800">
                      {Math.round(totalCost).toLocaleString()} Ar
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
