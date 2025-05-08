"use client";

import { Suspense } from "react";
import RecipeListSkeleton from "@/components/recipes/recipe-list-skeleton";
import RecipeList from "@/components/recipes/recipe-list";

export default function RecipesPage() {
  return (
    <div className="space-y-12 max-w-7xl mx-auto mb-12 px-4 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-chocolate-50/50 to-green-50/50 rounded-2xl p-8">
        <div>
          <h1 className="text-3xl tracking-wide font-bold text-chocolate-800 mb-2">
            Recettes de chocolat
          </h1>
          <p className="text-gray-700 tracking-wide leading-6">
            Découvrez nos délicieuses recettes de chocolat pour diabétiques.
          </p>
        </div>
      </div>

      <Suspense fallback={<RecipeListSkeleton />}>
        <RecipeList />
      </Suspense>
    </div>
  );
}
