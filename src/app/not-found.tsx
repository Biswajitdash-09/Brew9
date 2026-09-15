import Link from "next/link";
import { Coffee, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md mx-auto p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-lg space-y-6">
        <div className="p-4 bg-secondary/70 rounded-2xl w-fit mx-auto text-primary">
          <Coffee className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-primary">
            404 Error
          </span>
          <h1 className="text-3xl font-black text-foreground">
            Spilled Coffee?
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page you are looking for doesn’t exist or has moved. Let’s get you back to fresh coffee.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button className="w-full bg-primary text-primary-foreground font-bold min-h-[48px] gap-2 rounded-xl">
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
