import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecipeListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="border-3 pb-6 border-chocolate-300 ring-2 ring-chocolate-100/50 ring-offset-2 overflow-hidden rounded-[2rem]"
        >
          <CardHeader className="pt-6">
            <Skeleton className="h-7 w-3/4 mb-2" />
            <div className="flex flex-wrap gap-2 pt-2">
              <Skeleton className="h-6 w-32" />
            </div>
          </CardHeader>
          <CardContent className="pt-2 pb-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </CardContent>
          <div className="px-6 py-3 flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <div className="flex space-x-1">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
