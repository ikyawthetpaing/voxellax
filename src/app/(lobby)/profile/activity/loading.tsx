import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserActivityLoadingPage() {
  return (
    <div className="grid gap-8">
      <div className="space-y-4">
        <Skeleton className="w-28 h-10" />
      </div>
      <div className="grid gap-8">
        {Array.from({ length: 4 }, (_, i) => i).map((index) => (
          <div key={index} className="flex gap-4">
            <div className="w-40 sm:w-48 flex-shrink-0">
              <AspectRatio ratio={4 / 3}>
                <Skeleton className="w-full h-full" />
              </AspectRatio>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-full space-y-1">
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-1/2 h-5" />
              </div>

              <Skeleton className="w-28 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
