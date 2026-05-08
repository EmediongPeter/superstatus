import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  style: ["normal", "italic"],
  display: "swap",
});

// Update this when your domain is confirmed
const SITE_URL = "https://superstatus.co";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#141413" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "SuperStatus — Post to WhatsApp Status Every Day, Automatically",
    template: "%s | SuperStatus",
  },

  description:
    "SuperStatus writes and posts to your WhatsApp Status every day in your voice — while you focus on everything else. Built for Nigerian creators, freelancers, and business owners who know consistency builds income.",

  keywords: [
    "WhatsApp Status automation",
    "WhatsApp Status scheduler",
    "automate WhatsApp Status Nigeria",
    "WhatsApp business tool Nigeria",
    "post to WhatsApp Status automatically",
    "AI content for WhatsApp",
    "stay consistent on WhatsApp",
    "WhatsApp marketing tool freelancers",
    "WhatsApp Status for creators",
    "grow business WhatsApp Nigeria",
    "SuperStatus",
    "WhatsApp presence tool",
  ],

  authors: [{ name: "SuperStatus", url: SITE_URL }],
  creator: "SuperStatus",
  publisher: "SuperStatus",
  category: "Business & Productivity",

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

  openGraph: {
    type: "website",
    locale: "en_NG",
    alternateLocale: ["en_US", "en_GB"],
    url: SITE_URL,
    siteName: "SuperStatus",
    title: "SuperStatus — Post to WhatsApp Status Every Day, Automatically",
    description:
      "Never go quiet on WhatsApp Status again. SuperStatus posts every day in your voice, toward your goal — while you sleep, work, and live. Your network stays engaged. Clients reach out. You close deals.",
    // og:image is injected automatically by app/opengraph-image.tsx
  },

  twitter: {
    card: "summary_large_image",
    site: "@superstatushq",
    title: "SuperStatus — Post to WhatsApp Status Every Day, Automatically",
    description:
      "Never go quiet on WhatsApp Status again. SuperStatus posts every day in your voice — while you sleep, work, and live.",
    // twitter:image is injected automatically by app/opengraph-image.tsx
  },

  alternates: {
    canonical: SITE_URL,
  },

  // favicon + apple-touch-icon are injected automatically by app/icon.tsx + app/apple-icon.tsx
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased scroll-smooth",
        inter.variable,
        playfairDisplay.variable
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
