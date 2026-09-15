import type { Metadata } from "next";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using the BREW 9 platform and kiosks.",
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border space-y-8">
          <div className="border-b border-border pb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-foreground">Terms of Service</h1>
            <p className="text-xs text-muted-foreground mt-2">
              Last updated: September 2026 • BREW 9
            </p>
          </div>

          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the BREW 9 website and services, you agree to comply with and be bound by these Terms of Service.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">2. Menu & Pricing</h2>
              <p>
                All prices displayed on the website are in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Prices, menu items, and kiosk availability are subject to change based on fresh ingredient supply.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">3. User Conduct & Abuse Prevention</h2>
              <p>
                Users agree not to abuse or attempt automated spam against our feedback systems, API endpoints, or user registration flows. Automated rate-limiting safeguards are active across all write operations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">4. Contact Information</h2>
              <p>
                For inquiries regarding these terms, please write to{" "}
                <a href={`mailto:${BRAND.contactEmail}`} className="text-primary font-semibold hover:underline">
                  {BRAND.contactEmail}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
