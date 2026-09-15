import type { Metadata } from "next";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for BREW 9 customers and website users.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border space-y-8">
          <div className="border-b border-border pb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-foreground">Privacy Policy</h1>
            <p className="text-xs text-muted-foreground mt-2">
              Last updated: September 2026 • BREW 9
            </p>
          </div>

          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">1. Information We Collect</h2>
              <p>
                When you create an account on BREW 9, we collect your authentication details (name, email address, profile picture) provided through our authentication partner (Clerk). If you submit feedback, we record your rating, review message, and optional kiosk location.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">2. How We Use Your Information</h2>
              <p>
                Your information is used strictly to provide you with account services, remember your favorited menu items, improve our drink quality based on feedback, and ensure platform security and rate limiting.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">3. Data Protection & Security</h2>
              <p>
                We do not sell, rent, or trade your personal data to third parties. All sensitive data exchanges are encrypted in transit via HTTPS/TLS.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">4. Contact Us</h2>
              <p>
                If you have questions about your privacy or wish to request data deletion, contact us at{" "}
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
