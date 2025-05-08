import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import RecipeForm from "@/components/recipes/recipe-form";

export default function NewRecipePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-chocolate-50/50 to-green-50/50 rounded-2xl p-8">
        <div>
          <h1 className="text-3xl tracking-wide font-bold text-chocolate-800 mb-2">
            Nouvelle recette
          </h1>
        </div>
      </div>

      <Suspense fallback={<FormSkeleton />}>
        <RecipeForm />
      </Suspense>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[600px] w-full rounded-[2.5rem]" />
      <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
      <Skeleton className="h-[300px] w-full rounded-[2.5rem]" />
      <div className="flex justify-end gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-48" />
      </div>
    </div>
  );
}
