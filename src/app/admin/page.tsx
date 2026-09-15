"use client";

import * as React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { Coffee, MapPin, Users, MessageSquare, Plus, Database } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const stats = useQuery(api.admin.getDashboardStats);
  const seedData = useMutation(api.seed.seedInitialData);
  const [seeding, setSeeding] = React.useState(false);
  const [seedResult, setSeedResult] = React.useState<string | null>(null);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await seedData();
      setSeedResult(res?.message || "Sample items successfully added.");
    } catch (err: any) {
      setSeedResult(err?.message || "Failed to run seed.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Startup Overview
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time metrics across your menu, roadside kiosks, and registered customers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleSeed}
            disabled={seeding}
            variant="outline"
            size="sm"
            className="border-border bg-card hover:bg-secondary/60 text-xs font-semibold gap-1.5 min-h-[40px]"
          >
            <Database className="w-3.5 h-3.5 text-primary" />
            {seeding ? "Seeding..." : "Load Initial Menu Data"}
          </Button>
          <Link href="/admin/menu">
            <Button size="sm" className="bg-primary text-primary-foreground font-semibold text-xs gap-1.5 min-h-[40px]">
              <Plus className="w-3.5 h-3.5" /> Add Menu Item
            </Button>
          </Link>
        </div>
      </div>

      {seedResult && (
        <div className="p-4 rounded-2xl bg-secondary/50 border border-border text-xs font-medium text-foreground">
          ✨ {seedResult}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="rounded-2xl border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Drinks
            </CardTitle>
            <Coffee className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">
              {stats?.totalMenuItems ?? 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {stats?.featuredMenuItems ?? 0} featured on homepage
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Kiosk Locations
            </CardTitle>
            <MapPin className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">
              {stats?.totalLocations ?? 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {stats?.activeLocations ?? 0} active kiosks
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Registered Users
            </CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">
              {stats?.totalUsers ?? 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Synced from Clerk
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Customer Feedback
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">
              {stats?.totalFeedback ?? 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Reviews & ratings submitted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Coffee className="w-4 h-4 text-primary" />
            <span>Menu & Pricing Management</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Update drink prices in whole INR, toggle real-time availability, add seasonal specials, or adjust category tags.
          </p>
          <Link href="/admin/menu">
            <Button variant="outline" size="sm" className="text-xs font-bold">
              Manage Menu Items
            </Button>
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Kiosk Network Configuration</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Add new roadside kiosk locations, configure structured weekly schedules, and post live operational notices.
          </p>
          <Link href="/admin/locations">
            <Button variant="outline" size="sm" className="text-xs font-bold">
              Manage Kiosks
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
