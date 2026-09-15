import type { Metadata } from "next";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { FeedbackForm } from "@/components/forms/feedback-form";

export const metadata: Metadata = {
  title: "Contact & Feedback — BREW 9",
  description:
    "Get in touch with the BREW 9 coffee team or submit your feedback on our fresh brews and kiosk experience.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 text-foreground text-xs font-bold uppercase tracking-wider mb-3">
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                <span>Let’s Connect</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
                Say Hello to BREW 9
              </h1>
              <p className="text-base text-muted-foreground mt-3 leading-relaxed">
                Whether you have suggestions, franchise inquiries for upcoming kiosks, or want to partner on events, we’d love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-secondary/80 text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</h3>
                  <a
                    href={`mailto:${BRAND.contactEmail}`}
                    className="text-base font-bold text-foreground hover:underline"
                  >
                    {BRAND.contactEmail}
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-secondary/80 text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Headquarters</h3>
                  <p className="text-sm font-semibold text-foreground">
                    Bhubaneswar, Odisha, India
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Expanding across educational and transit hubs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Feedback form */}
          <div className="lg:col-span-7">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
}
