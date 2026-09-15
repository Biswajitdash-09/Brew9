"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { Star, MessageSquare } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminFeedbackPage() {
  const feedbackList = useQuery(api.feedback.listAll);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-foreground">
          Customer Feedback
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review customer ratings, taste feedback, and kiosk suggestions.
        </p>
      </div>

      {feedbackList && feedbackList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {feedbackList.map((item: any) => (
            <Card key={item._id} className="rounded-2xl border-border bg-card shadow-xs">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{item.userName}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{item.userEmail}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-bold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating} / 5</span>
                  </div>
                </div>

                <p className="text-sm text-foreground/90 bg-background/60 p-3.5 rounded-xl border border-border/60 leading-relaxed">
                  &ldquo;{item.message}&rdquo;
                </p>

                <div className="text-[11px] text-muted-foreground flex items-center justify-between pt-1">
                  <span>
                    Submitted on{" "}
                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    Verified User
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center border border-dashed border-border rounded-2xl bg-card/40">
          <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-semibold text-foreground">No customer feedback submitted yet.</p>
          <p className="text-xs text-muted-foreground mt-1">
            Feedback submitted via the Contact page will appear here for review.
          </p>
        </div>
      )}
    </div>
  );
}
