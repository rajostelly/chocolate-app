import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import RecipeDetail from "@/components/recipes/recipe-detail";

export default function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-12">
      <Suspense fallback={<RecipeDetailSkeleton />}>
        <RecipeDetail recipeId={params.id} />
      </Suspense>
    </div>
  );
}

function RecipeDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-40" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <Skeleton className="h-[300px] w-full rounded-[2.5rem]" />

      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="h-[400px] rounded-3xl" />
        <Skeleton className="h-[400px] rounded-3xl" />
      </div>

      <Skeleton className="h-[200px] rounded-3xl" />
    </div>
  );
}
