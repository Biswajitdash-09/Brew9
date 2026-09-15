"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Heart, User, Coffee, LogOut, ArrowRight, Shield } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { MenuCard, MenuItemData } from "@/components/menu/menu-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const convexUser = useQuery(api.users.getMe);
  const favorites = useQuery(api.favorites.listByUser);

  if (!isLoaded) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Loading your BREW 9 profile...
      </div>
    );
  }

  const role = convexUser?.role || "user";
  const userFavorites: MenuItemData[] = favorites || [];

  return (
    <div className="py-12 md:py-16 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Profile Header Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/40 bg-secondary/80 shrink-0">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "User Avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary">
                  <User className="w-10 h-10" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                  {user?.fullName || "Coffee Enthusiast"}
                </h1>
                {role === "admin" && (
                  <Badge className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 gap-1">
                    <Shield className="w-3 h-3" /> Admin
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {role === "admin" && (
              <Link href="/admin">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs min-h-[44px]">
                  Admin Dashboard
                </Button>
              </Link>
            )}
            <SignOutButton>
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive/10 border-border font-semibold text-xs min-h-[44px] gap-1.5"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </SignOutButton>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-100 text-red-600">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  Your Favorite Drinks
                </h2>
                <p className="text-xs text-muted-foreground">
                  Quick access to the brews you love most.
                </p>
              </div>
            </div>

            <Link href="/menu">
              <Button variant="ghost" size="sm" className="text-primary font-bold text-xs gap-1">
                Browse Menu <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {userFavorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userFavorites.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl border border-dashed border-border bg-card/60 text-center space-y-3">
              <Coffee className="w-8 h-8 text-muted-foreground mx-auto" />
              <h3 className="font-bold text-base text-foreground">No favorites yet</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Tap the heart icon on any drink in our menu to save your everyday orders here.
              </p>
              <div className="pt-2">
                <Link href="/menu">
                  <Button className="bg-primary text-primary-foreground font-semibold text-xs min-h-[40px]">
                    Explore Drinks
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
