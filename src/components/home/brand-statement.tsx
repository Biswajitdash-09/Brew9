import { BRAND } from "@/lib/constants/brand";

export function BrandStatement() {
  return (
    <section className="py-16 md:py-24 bg-card border-b border-border">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
          THE 9-TO-9 MANIFESTO
        </span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight max-w-4xl mx-auto">
          Built for daily hustle, quick breaks, and good coffee that never burns a hole in your pocket.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
          {BRAND.story}
        </p>
      </div>
    </section>
  );
}
