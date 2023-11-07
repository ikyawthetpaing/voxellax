import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddReviewForm } from "../forms/add-review-form";

interface Props {
  trigger: React.ReactNode;
}

export function AddReviewDialog({ trigger }: Props) {
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
        <AddReviewForm />
        <div className="grid grid-cols-2 gap-6">
          <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
            Cancel
          </DialogTrigger>
          <Button type="submit">Add Review</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
