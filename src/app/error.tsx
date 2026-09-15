"use client";

import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md mx-auto p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-lg space-y-6">
        <div className="p-4 bg-destructive/10 rounded-2xl w-fit mx-auto text-destructive">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-destructive">
            Something Went Wrong
          </span>
          <h1 className="text-2xl font-black text-foreground">
            Temporary Hiccup
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An unexpected error occurred while loading this page. Please try refreshing.
          </p>
        </div>

        <div className="pt-2">
          <Button
            onClick={() => reset()}
            className="w-full bg-primary text-primary-foreground font-bold min-h-[48px] gap-2 rounded-xl"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
