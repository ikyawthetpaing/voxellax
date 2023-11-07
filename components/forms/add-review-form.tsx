import { ChangeEvent, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";

export function AddReviewForm() {
  const [review, setReview] = useState<{
    rate: number | null;
    message: string | null;
  }>({
    rate: null,
    message: null,
  });

  const handleRateChange = (value: number) => {
    setReview({ ...review, rate: value });
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview({ ...review, message: e.target.value });
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label>Overall Review</Label>

        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => handleRateChange(value)}
            >
              <Icons.star
                className={cn("h-6 w-6 text-muted-foreground", {
                  "text-blue-500": review.rate && value <= review.rate,
                })}
              />
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">
          Tell us about your experience with this product
        </Label>
        <Textarea
          id="message"
          placeholder="Write your message"
          onChange={handleMessageChange}
        />
      </div>
    </div>
  );
}
