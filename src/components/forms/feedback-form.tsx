"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Send, CheckCircle2, AlertCircle, LogIn } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const feedbackSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(500, "Message cannot exceed 500 characters"),
  locationId: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export function FeedbackForm() {
  const { isSignedIn, isLoaded } = useUser();
  const submitFeedback = useMutation(api.feedback.submit);
  const locations = useQuery(api.locations.getActive);

  const [hoverRating, setHoverRating] = React.useState<number>(0);
  const [statusMessage, setStatusMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 5,
      message: "",
      locationId: undefined,
    },
  });

  const selectedRating = watch("rating");
  const messageContent = watch("message") || "";

  const onSubmit = async (data: FeedbackFormValues) => {
    setStatusMessage(null);
    try {
      await submitFeedback({
        rating: data.rating,
        message: data.message.trim(),
        locationId: data.locationId ? (data.locationId as any) : undefined,
      });

      setStatusMessage({
        type: "success",
        text: "Thank you for your feedback! Your review helps us brew better coffee every day.",
      });
      reset({ rating: 5, message: "", locationId: undefined });
    } catch (err: any) {
      const errorMsg =
        err?.message?.includes("Too many requests")
          ? "Too many requests. Please try again in a few minutes."
          : "Unable to submit feedback right now. Please try again shortly.";
      setStatusMessage({ type: "error", text: errorMsg });
    }
  };

  if (isLoaded && !isSignedIn) {
    return (
      <div className="p-8 rounded-3xl bg-card border border-border text-center space-y-4">
        <div className="p-3 bg-secondary/60 rounded-full w-fit mx-auto text-primary">
          <Star className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Share Your BREW 9 Experience</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Please sign in to submit customer feedback and rate your favorite brews.
        </p>
        <div className="pt-2">
          <Link href="/auth/sign-in">
            <Button className="bg-primary text-primary-foreground font-semibold px-6 min-h-[44px] gap-2">
              <LogIn className="w-4 h-4" /> Sign In to Leave Feedback
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-md space-y-6"
      noValidate
    >
      <div>
        <h3 className="text-2xl font-black text-foreground">Customer Feedback</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us how your brew tasted or share ideas for our next kiosk.
        </p>
      </div>

      {/* Star Rating */}
      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
          Rating (1 to 5 Stars)
        </Label>
        <div
          className="flex items-center gap-1.5"
          role="radiogroup"
          aria-label="Star rating from 1 to 5"
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = (hoverRating || selectedRating) >= star;
            return (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={selectedRating === star}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                onClick={() => setValue("rating", star, { shouldValidate: true })}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 rounded-md text-amber-500 hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-w-[36px] min-h-[36px]"
              >
                <Star className={cn("w-7 h-7", isFilled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40")} />
              </button>
            );
          })}
        </div>
        {errors.rating && (
          <p className="text-xs text-destructive font-medium">{errors.rating.message}</p>
        )}
      </div>

      {/* Location Selector (Optional) */}
      {locations && locations.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="location-select" className="text-xs font-bold uppercase tracking-wider text-foreground">
            Kiosk Visited (Optional)
          </Label>
          <select
            id="location-select"
            {...register("locationId")}
            className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="">General Brand Feedback / Online</option>
            {locations.map((loc: any) => (
              <option key={loc._id} value={loc._id}>
                {loc.name} ({loc.city})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Message Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="feedback-message" className="text-xs font-bold uppercase tracking-wider text-foreground">
            Your Review / Message
          </Label>
          <span className="text-xs text-muted-foreground font-mono">
            {messageContent.length}/500
          </span>
        </div>
        <Textarea
          id="feedback-message"
          {...register("message")}
          placeholder="How was the temperature, flavor, and speed of service?"
          rows={4}
          maxLength={500}
          className="rounded-xl bg-background border-border text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-destructive font-medium">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Targeted aria-live status alert */}
      {statusMessage && (
        <div
          role="alert"
          aria-live="polite"
          className={cn(
            "p-4 rounded-xl text-xs font-medium flex items-center gap-2.5",
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          )}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 min-h-[48px] font-bold text-sm flex items-center justify-center gap-2 rounded-xl"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? "Submitting Review..." : "Send Feedback"}
      </Button>
    </form>
  );
}
