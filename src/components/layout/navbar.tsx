"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { Coffee, User as UserIcon } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";
import { MAIN_NAV_LINKS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-xs py-2.5"
          : "bg-background/70 backdrop-blur-xs py-4"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Logo size="md" showTagline={false} />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {MAIN_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isLoaded && isSignedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors",
                  pathname.startsWith("/account")
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                )}
              >
                <UserIcon className="w-3.5 h-3.5" />
                Account
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9 border-2 border-primary/40",
                  },
                }}
              />
            </div>
          ) : (
            <Link href="/auth/sign-in">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-foreground hover:bg-secondary/60"
              >
                Sign In
              </Button>
            </Link>
          )}

          <Link href="/menu">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-4 shadow-xs flex items-center gap-1.5"
            >
              <Coffee className="w-4 h-4" />
              View Menu
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Trigger */}
        <MobileNav />
      </div>
    </header>
  );
}
