import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Coffee, ArrowRight, ShieldCheck, Heart, Users } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us — The 9-to-9 Coffee Story",
  description:
    "Learn about BREW 9: Born from the daily Indian commute, built to deliver fresh, affordable, honest coffee starting at ₹30.",
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        {/* Story Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/80 text-foreground text-xs font-bold uppercase tracking-wider">
            <Coffee className="w-3.5 h-3.5 text-primary" />
            <span>Our Journey</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
            Coffee Crafted for the Real Daily Grind.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-2">
            {BRAND.story}
          </p>
        </div>

        {/* The Problem & Solution with Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border space-y-4">
            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden mb-4 border border-border/80">
              <Image
                src="/images/about.jpg"
                alt="Artisan ceramic cup with specialty latte art and coffee leaf"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">The Gap</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Why should good coffee cost ₹250+?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For too long, quality espresso and brewed coffee in India were locked behind expensive cafés and pretentious menus. Meanwhile, quick roadside options often lacked hygiene or consistent flavor.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We started BREW 9 to fix that equation. High-grade Indian beans, precision brewing equipment, and tight operational speed — priced so you can enjoy it every single day.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-primary text-primary-foreground space-y-4">
            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden mb-4 border border-primary-foreground/20">
              <Image
                src="/images/kiosk.jpg"
                alt="Modern BREW 9 roadside compact coffee kiosk"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">Our Promise</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-foreground">
              Grab. Sip. Go.
            </h2>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Our compact roadside kiosks are optimized for 60-second turnarounds. Whether you are catching the morning train, heading to college, or taking an evening ride, your brew is hot, consistent, and ready.
            </p>
            <div className="pt-4">
              <Link href="/menu">
                <Button className="bg-background text-primary hover:bg-background/90 font-bold text-sm min-h-[44px]">
                  Explore the Menu <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              What We Stand For
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Simple principles that guide every single cup we brew.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <div className="p-3 rounded-xl bg-secondary/80 text-primary w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Zero Compromise Beans</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sourced from ethical Indian coffee estates in Karnataka and Kerala. Freshly roasted and ground daily.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <div className="p-3 rounded-xl bg-secondary/80 text-primary w-fit">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Fair Everyday Pricing</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Coffee priced fairly at ₹30–₹70. Designed so daily commuters never have to hesitate for a good cup.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <div className="p-3 rounded-xl bg-secondary/80 text-primary w-fit">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Community Centered</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A warm morning smile, fast service, and a friendly hub right by your daily travel stop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
