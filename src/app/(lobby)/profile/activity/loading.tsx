import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserActivityLoadingPage() {
  return (
    <div className="grid gap-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="grid gap-8">
        {Array.from({ length: 4 }, (_, i) => i).map((index) => (
          <div key={index} className="flex gap-4">
            <div className="w-40 shrink-0 sm:w-48">
              <AspectRatio ratio={4 / 3}>
                <Skeleton className="h-full w-full" />
              </AspectRatio>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <div className="w-full space-y-1">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-1/2" />
              </div>

              <Skeleton className="h-5 w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
