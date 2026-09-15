import { SignUp } from "@clerk/nextjs";
import { Logo } from "@/components/brand/logo";

export const metadata = {
  title: "Sign Up — BREW 9",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <Logo size="lg" showTagline={true} />
        <SignUp
          appearance={{
            elements: {
              card: "rounded-3xl border border-border bg-card shadow-xl",
              headerTitle: "text-foreground font-black text-xl",
              headerSubtitle: "text-muted-foreground text-sm",
              socialButtonsBlockButton: "rounded-xl border-border bg-background hover:bg-secondary/40",
              formButtonPrimary: "bg-primary hover:bg-primary/90 rounded-xl font-bold min-h-[44px]",
              footerActionLink: "text-primary font-bold hover:underline",
            },
          }}
        />
      </div>
    </div>
  );
}
