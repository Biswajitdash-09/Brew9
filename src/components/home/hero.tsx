import Link from "next/link";
import Image from "next/image";
import { Coffee, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-28 lg:pb-32 bg-background border-b border-border"
      aria-labelledby="hero-heading"
    >
      {/* Decorative subtle background radial glow */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-warm-beige/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-secondary/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy, Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-border text-foreground text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Starting at just ₹30 • Grab & Go</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.05]"
            >
              YOUR <br />
              <span className="text-primary underline decoration-secondary decoration-wavy underline-offset-8">
                9-TO-9
              </span>{" "}
              BREW.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
              {BRAND.secondaryTagline} Freshly brewed, affordable, youth-focused coffee made for commuters, students, and everyone keeping India moving.
            </p>

            {/* Key Value Micro-Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-card border border-border px-3 py-1 rounded-md">
                ⚡ 60-Second Pickup
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-card border border-border px-3 py-1 rounded-md">
                ☕ 100% Indian Arabica & Robusta
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-card border border-border px-3 py-1 rounded-md">
                ₹ Zero Overpriced Fluff
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <Link href="/menu">
                <Button
                  size="lg"
                  className="w-full sm:w-auto min-h-[50px] px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base shadow-md flex items-center justify-center gap-2 rounded-xl"
                >
                  <Coffee className="w-5 h-5" />
                  View Menu
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/locations">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto min-h-[50px] px-6 bg-card border-border hover:bg-secondary/60 text-foreground font-bold text-base rounded-xl flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  Find a Kiosk
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 w-full max-w-md mx-auto rounded-3xl overflow-hidden border-2 border-border shadow-2xl bg-card">
              <Image
                src="/images/hero.jpg"
                alt="Fresh takeaway coffee cup in front of the modern BREW 9 roadside kiosk"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                      Signature House Special
                    </span>
                    <h2 className="text-base font-extrabold text-foreground">The 9 Brew</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-primary">₹60</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  Slow-extracted espresso with roasted hazelnut note.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
