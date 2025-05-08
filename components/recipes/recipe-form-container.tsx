"use client";

import { useRecipe } from "@/hooks/use-recipes";
import RecipeForm from "./recipe-form";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

export default function RecipeFormContainer({
  recipeId,
}: {
  recipeId: string;
}) {
  const router = useRouter();
  const { data: recipe, isLoading, error } = useRecipe(recipeId);

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

  return <RecipeForm recipe={recipe} isEditing={true} />;
}
