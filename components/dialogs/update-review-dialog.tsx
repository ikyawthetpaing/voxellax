"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { deleteReview, updateReview } from "@/lib/actions/review";
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
  review: { rate: number; message: string | null };
  productId: string;
  trigger: React.ReactNode;
}

export function UpdateReviewDialog({ review, trigger, productId }: Props) {
  const [newReview, setNewReview] = useState<{
    rate: number | null;
    message: string | null;
  }>(review);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (
      newReview.rate === review.rate &&
      newReview.message === review.message
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newReview, review.message, review.rate]);

  const handleUpdate = async () => {
    if (review.rate) {
      setIsUpdating(true);
      try {
        const res = await updateReview({
          productId: productId,
          rate: review.rate,
          message: review.message,
        });
        if (res.ok) {
          toast.success("Review has been updated successfully!");
        } else {
          toast.error("Failed to update the review. Please try again later.");
        }
      } catch (error) {
        console.error("Error updating review:", error);
        toast.error(
          "An error occurred while updating the review. Please try again later."
        );
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteReview({
        productId: productId,
      });
      if (res.ok) {
        toast.success("Review has been deleted successfully!");
      } else {
        toast.error("Failed to delete the review. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleteing review:", error);
      toast.error(
        "An error occurred while deleteing the review. Please try again later."
      );
    } finally {
      setIsDeleting(false);
    }
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
        <ReviewForm review={newReview} setReview={setNewReview} />
        <div className="grid grid-cols-2 gap-6">
          <LoadingButton
            isLoading={isDeleting}
            onClick={handleDelete}
            disabled={isDeleting || isUpdating}
            variant="destructive"
          >
            Delete
          </LoadingButton>
          <LoadingButton
            isLoading={isUpdating}
            onClick={handleUpdate}
            disabled={isDeleting || isUpdating || disabled}
          >
            Update
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
