import Link from "next/link";
import { Coffee, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Subtle background decorative shapes */}
      <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />
      <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-bold uppercase tracking-widest mb-4">
          {BRAND.tagline}
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
          Ready for your daily brew?
        </h2>
        <p className="text-base sm:text-lg text-primary-foreground/80 mt-4 max-w-xl mx-auto leading-relaxed font-medium">
          Swing by our kiosk or explore our menu. Simple, satisfying coffee that keeps your day energized.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/menu">
            <Button
              size="lg"
              className="w-full sm:w-auto min-h-[50px] px-8 bg-background text-primary hover:bg-background/90 font-bold text-base shadow-lg flex items-center justify-center gap-2 rounded-xl"
            >
              <Coffee className="w-5 h-5" />
              Explore Menu
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-h-[50px] px-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base rounded-xl"
            >
              Send Us Feedback
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
