"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Coffee, MapPin, Users, MessageSquare, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Menu Items", href: "/admin/menu", icon: Coffee },
  { label: "Kiosks & Locations", href: "/admin/locations", icon: MapPin },
  { label: "Users & Roles", href: "/admin/users", icon: Users },
  { label: "Customer Feedback", href: "/admin/feedback", icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-card border-r border-border p-6 flex flex-col justify-between min-h-[calc(100vh-80px)]">
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <Logo size="sm" />
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-primary text-primary-foreground tracking-wider">
            Admin
          </span>
        </div>

        <nav className="space-y-1.5" aria-label="Admin Navigation">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Live Website
        </Link>
      </div>
    </aside>
  );
}
