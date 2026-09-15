import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/constants/seo";
import { ConvexClientProvider } from "@/lib/providers/convex-client-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "BREW 9",
    "coffee startup",
    "fresh coffee",
    "roadside kiosk coffee",
    "affordable coffee India",
    "cappuccino",
    "cold brew",
    "grab and go coffee",
  ],
  authors: [{ name: "BREW 9 Team" }],
  creator: "BREW 9",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    creator: "@brew9coffee",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#3A2418",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full scroll-smooth`}>
      <body className="flex flex-col min-h-screen font-sans bg-background text-foreground antialiased selection:bg-secondary selection:text-foreground">
        <SkipLink />
        <ConvexClientProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main id="main-content" className="flex-1 flex flex-col focus:outline-none" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
