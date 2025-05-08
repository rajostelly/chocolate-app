"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  updateRecipeStock,
} from "@/lib/api/recipes";
import type { RecipeFormData, RecipeWithIngredients } from "@/types";
import { QUERY_KEYS, TOAST_MESSAGES } from "@/constants";

// Hook for fetching all recipes
export function useRecipes() {
  return useQuery({
    queryKey: QUERY_KEYS.RECIPES,
    queryFn: async () => {
      try {
        return await getRecipes();
      } catch (error) {
        toast.error(
          `${TOAST_MESSAGES.ERROR.FETCH_RECIPES}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
        throw error;
      }
    },
  });
}

// Hook for fetching a single recipe
export function useRecipe(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.RECIPE(id),
    queryFn: async () => {
      try {
        return await getRecipe(id);
      } catch (error) {
        toast.error(
          `${TOAST_MESSAGES.ERROR.FETCH_RECIPE}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
        throw error;
      }
    },
    enabled: !!id,
  });
}

// Hook for creating a recipe
export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: RecipeFormData) => createRecipe(recipe),
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.SUCCESS.CREATE_RECIPE);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECIPES });
    },
    onError: (error: unknown) => {
      toast.error(
        `${TOAST_MESSAGES.ERROR.CREATE_RECIPE}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });
}

// Hook for updating a recipe
export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      recipe,
    }: {
      id: string;
      recipe: Partial<RecipeWithIngredients>;
    }) => updateRecipe(id, recipe),
    onSuccess: (data) => {
      toast.success(TOAST_MESSAGES.SUCCESS.UPDATE_RECIPE);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECIPE(data.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECIPES });
    },
    onError: (error: unknown) => {
      toast.error(
        `${TOAST_MESSAGES.ERROR.UPDATE_RECIPE}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });
}

// Hook for deleting a recipe
export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onSuccess: (_, id) => {
      toast.success(TOAST_MESSAGES.SUCCESS.DELETE_RECIPE);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECIPES });
    },
    onError: (error: unknown) => {
      toast.error(
        `${TOAST_MESSAGES.ERROR.DELETE_RECIPE}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });
}

// Hook for updating recipe stock
export function useUpdateRecipeStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stock }: { id: string; stock: number }) =>
      updateRecipeStock(id, stock),
    onSuccess: (data) => {
      toast.success(TOAST_MESSAGES.SUCCESS.UPDATE_STOCK);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECIPE(data.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECIPES });
    },
    onError: (error: unknown) => {
      toast.error(
        `${TOAST_MESSAGES.ERROR.UPDATE_STOCK}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });
}
