import { Coffee, Tag, Zap } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

const ICONS = {
  Coffee: Coffee,
  Tag: Tag,
  Zap: Zap,
};

export function WhyBrew9() {
  return (
    <section className="py-16 md:py-24 bg-card border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
            THE 3 PILLARS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Why Choose BREW 9?
          </h2>
          <p className="text-sm text-muted-foreground mt-3">
            We stripped away the pretentious café markups to give you honest coffee made right.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRAND.pillars.map((pillar) => {
            const IconComponent = ICONS[pillar.icon as keyof typeof ICONS] || Coffee;
            const isGoodCoffee = pillar.icon === "Coffee";
            return (
              <div
                key={pillar.title}
                className="group rounded-3xl bg-background border border-border/80 hover:border-primary/40 transition-all hover:shadow-lg flex flex-col overflow-hidden"
              >
                {isGoodCoffee && (
                  <div className="relative aspect-16/10 w-full overflow-hidden border-b border-border/60">
                    <img
                      src="/images/features/good-coffee.jpg"
                      alt="Fresh espresso extraction at BREW 9 kiosk"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col items-start gap-4 flex-1">
                  <div className="p-3.5 rounded-xl bg-secondary/80 text-primary">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
