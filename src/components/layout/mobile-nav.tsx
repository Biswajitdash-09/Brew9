"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Coffee, User, LogIn } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { MAIN_NAV_LINKS } from "@/lib/constants/navigation";
import { BRAND } from "@/lib/constants/brand";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Close drawer on route navigation
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle escape key and lock body scroll when open
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      // Focus close button on open
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-lg text-foreground hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-card border-l border-border p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <Logo size="sm" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-lg text-foreground hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-2">
            {MAIN_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center min-h-[44px] px-3 py-2 rounded-md font-medium text-base transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Account Actions */}
        <div className="pt-6 border-t border-border flex flex-col gap-3">
          {isSignedIn ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/account"
                className="flex items-center gap-3 min-h-[44px] px-3 py-2 rounded-md bg-secondary/40 hover:bg-secondary/70 transition-colors"
              >
                <User className="w-5 h-5 text-primary" />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-foreground truncate max-w-[180px]">
                    {user?.fullName || user?.primaryEmailAddress?.emailAddress || "My Account"}
                  </span>
                  <span className="text-xs text-muted-foreground">View profile & favorites</span>
                </div>
              </Link>
              <SignOutButton>
                <Button variant="outline" className="w-full min-h-[44px] text-destructive hover:bg-destructive/10">
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/auth/sign-in">
                <Button variant="outline" className="w-full min-h-[44px] justify-center gap-2">
                  <LogIn className="w-4 h-4" /> Sign In
                </Button>
              </Link>
              <Link href="/menu">
                <Button className="w-full min-h-[44px] justify-center gap-2 bg-primary text-primary-foreground">
                  <Coffee className="w-4 h-4" /> View Menu
                </Button>
              </Link>
            </div>
          )}

          <div className="text-center text-xs text-muted-foreground pt-2">
            {BRAND.tagline}
          </div>
        </div>
      </div>
    </div>
  );
}
