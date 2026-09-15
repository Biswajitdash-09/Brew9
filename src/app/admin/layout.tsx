"use client";

import * as React from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const currentUser = useQuery(api.users.getMe);

  if (currentUser === undefined) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-sm font-semibold text-muted-foreground animate-pulse">
          Verifying administrator credentials...
        </div>
      </div>
    );
  }

  // Role authorization guard
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-card border border-border text-center space-y-5 shadow-lg">
          <div className="p-3 bg-destructive/10 text-destructive rounded-2xl w-fit mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-black text-foreground">Access Restricted</h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This area is restricted to authorized BREW 9 administrators. Your current account does not have administrator privileges.
            </p>
          </div>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground font-semibold text-xs min-h-[44px] gap-2 rounded-xl">
              <ArrowLeft className="w-4 h-4" /> Return to Website
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-background">
      <AdminSidebar />
      <div className="flex-1 p-6 sm:p-8 lg:p-10 overflow-x-auto">{children}</div>
    </div>
  );
}
