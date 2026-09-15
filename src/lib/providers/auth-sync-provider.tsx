"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const ensureUser = useMutation(api.users.ensureCurrentUser);
  const syncedUserIdRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      if (!isSignedIn) {
        syncedUserIdRef.current = null;
      }
      return;
    }

    // Execute strictly once per user login session
    if (syncedUserIdRef.current === user.id) {
      return;
    }

    syncedUserIdRef.current = user.id;

    ensureUser()
      .then(() => {
        // Successfully synced with Convex
      })
      .catch((err) => {
        // Non-blocking sync warning (e.g., in offline or dev setup)
        console.warn("Non-blocking auth sync status:", err);
        // Reset ref so it can retry on subsequent user action if needed
        syncedUserIdRef.current = null;
      });
  }, [isLoaded, isSignedIn, user, ensureUser]);

  return <>{children}</>;
}
