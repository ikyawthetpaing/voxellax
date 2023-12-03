"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { addReview } from "@/lib/actions/review";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReviewForm } from "@/components/forms/review-form";
import { LoadingButton } from "@/components/loading-button";

interface Props {
  productId: string;
  trigger: React.ReactNode;
}

export function AddReviewDialog({ trigger, productId }: Props) {
  const [review, setReview] = useState<{
    rate: number | null;
    message: string | null;
  }>({
    rate: null,
    message: null,
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = () => {
    startTransition(async () => {
      if (review.rate) {
        try {
          const res = await addReview({
            productId: productId,
            rate: review.rate,
            message: review.message,
          });

          if (res.ok) {
            toast.success("Review has been added successfully!");
          } else {
            toast.error("Failed to add the review. Please try again later.");
          }

          router.refresh();
        } catch (error) {
          console.error("Error adding review:", error);
          toast.error(
            "An error occurred while adding the review. Please try again later."
          );
        }
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>
            Share your thoughts and experiences with this product. Your feedback
            helps others make informed decisions.
          </DialogDescription>
        </DialogHeader>
        <ReviewForm review={review} setReview={setReview} />
        <div className="grid grid-cols-2 gap-6">
          <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
            Cancel
          </DialogTrigger>
          <LoadingButton
            isLoading={isPending}
            onClick={handleSubmit}
            disabled={!review.rate || isPending}
          >
            Add Review
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
