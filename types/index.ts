import { Ingredient, Recipe } from "@/lib/generated/prisma";

export type RecipeWithIngredients = Recipe & {
  ingredients: Ingredient[];
};

export type RecipeFormData = Omit<
  RecipeWithIngredients,
  "id" | "createdAt" | "updatedAt"
>;
