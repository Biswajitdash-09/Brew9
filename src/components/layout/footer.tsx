import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { FOOTER_NAV_LINKS } from "@/lib/constants/navigation";
import { Logo } from "@/components/brand/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card border-t border-border mt-auto" role="contentinfo">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Logo size="lg" showTagline={true} />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mt-2">
              {BRAND.story}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary/80 text-secondary-foreground">
                Roadside Kiosk #1 Coming Soon
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Legal & Support
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.contactEmail}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {BRAND.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} {BRAND.name}. All rights reserved.</p>
          <p className="flex items-center gap-2 font-medium">
            <span>{BRAND.tagline}</span>
            <span>•</span>
            <span>Fresh Indian Coffee</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
