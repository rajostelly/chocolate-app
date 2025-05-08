import type { RecipeWithIngredients } from "@/types";
import { API_ENDPOINTS } from "@/constants";

// Get all recipes
export async function getRecipes(): Promise<RecipeWithIngredients[]> {
  const response = await fetch(API_ENDPOINTS.RECIPES);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return response.json();
}

// Get a single recipe by ID
export async function getRecipe(id: string): Promise<RecipeWithIngredients> {
  const response = await fetch(API_ENDPOINTS.RECIPE(id));

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  return response.json();
}

// Create a new recipe
export async function createRecipe(
  recipe: Omit<RecipeWithIngredients, "id" | "createdAt" | "updatedAt">
): Promise<RecipeWithIngredients> {
  const response = await fetch(API_ENDPOINTS.RECIPES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Failed to create recipe");
  }

  return response.json();
}

// Update a recipe
export async function updateRecipe(
  id: string,
  recipe: Partial<RecipeWithIngredients>
): Promise<RecipeWithIngredients> {
  const response = await fetch(API_ENDPOINTS.RECIPE(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Failed to update recipe");
  }

  return response.json();
}

// Delete a recipe
export async function deleteRecipe(id: string): Promise<void> {
  const response = await fetch(API_ENDPOINTS.RECIPE(id), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete recipe");
  }
}

// Update recipe stock
export async function updateRecipeStock(
  id: string,
  stock: number
): Promise<RecipeWithIngredients> {
  const response = await fetch(API_ENDPOINTS.RECIPE_STOCK(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stock }),
  });

  if (!response.ok) {
    throw new Error("Failed to update recipe stock");
  }

  return response.json();
}
