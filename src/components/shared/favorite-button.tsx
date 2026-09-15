"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  menuItemId: string;
  className?: string;
  size?: "sm" | "md";
}

export function FavoriteButton({ menuItemId, className, size = "md" }: FavoriteButtonProps) {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const isFav = useQuery(api.favorites.isFavorited, isSignedIn ? { menuItemId } : "skip");
  const toggleFavorite = useMutation(api.favorites.toggle);
  const [optimisticFav, setOptimisticFav] = React.useState<boolean | null>(null);
  const [isPending, setIsPending] = React.useState(false);

  const favorited = optimisticFav ?? (isFav === true);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      router.push("/auth/sign-in");
      return;
    }

    if (isPending) return;

    // Optimistic toggle
    const nextState = !favorited;
    setOptimisticFav(nextState);
    setIsPending(true);

    try {
      await toggleFavorite({ menuItemId });
    } catch (err) {
      // Rollback on error
      setOptimisticFav(!nextState);
      console.error("Failed to toggle favorite:", err);
    } finally {
      setIsPending(false);
    }
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-w-[36px] min-h-[36px]",
        favorited
          ? "text-red-500 bg-red-50 hover:bg-red-100"
          : "text-muted-foreground bg-background/80 hover:text-foreground hover:bg-secondary/60",
        className
      )}
    >
      <Heart
        className={cn(
          iconSizes[size],
          "transition-transform active:scale-90",
          favorited ? "fill-current scale-110" : ""
        )}
      />
    </button>
  );
}
