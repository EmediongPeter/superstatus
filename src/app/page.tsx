import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { WaitlistCTA } from "@/components/landing/WaitlistCTA";
import { Footer } from "@/components/landing/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://superstatus.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "SuperStatus",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/og-image.png`,
        "width": 1200,
        "height": 630,
      },
      "description":
        "SuperStatus is a WhatsApp Status automation platform for creators, freelancers, and business owners in Nigeria and Africa.",
      "foundingDate": "2025",
      "areaServed": ["NG", "GH", "KE", "ZA", "GB", "US"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#product`,
      "name": "SuperStatus",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Social Media Automation",
      "operatingSystem": "Web, WhatsApp",
      "url": SITE_URL,
      "description":
        "SuperStatus writes and posts to your WhatsApp Status every day in your voice. Set your goal once. Our system handles the content, timing, and posting — while your phone can be off. Built for Nigerian creators, freelancers, and business owners.",
      "featureList": [
        "Daily WhatsApp Status posting",
        "AI-generated content in your voice",
        "Works while your phone is off",
        "Post approval before publishing",
        "Goal-oriented content strategy",
        "Safe account pacing",
      ],
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/PreOrder",
        "description": "Early access waitlist — free to join",
        "price": "0",
        "priceCurrency": "USD",
      },
      "audience": {
        "@type": "BusinessAudience",
        "name": "Nigerian creators, freelancers, and business owners",
        "geographicArea": {
          "@type": "Country",
          "name": "Nigeria",
        },
      },
      "publisher": { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "SuperStatus",
      "description":
        "Post to WhatsApp Status every day, automatically. Built for Nigerian creators, freelancers & business owners.",
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is SuperStatus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SuperStatus is a WhatsApp Status automation tool that posts to your status every day in your voice. You set your goal once — more clients, more visibility, more sales — and SuperStatus writes and posts content toward that goal automatically, even when your phone is off.",
          },
        },
        {
          "@type": "Question",
          "name": "Does SuperStatus work without my phone being on?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. SuperStatus uses a cloud-hosted companion device that connects to your WhatsApp once via QR code scan. After that, your phone can be off, dead, or anywhere in the world — posts still go out on schedule.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I approve posts before they go live?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. For your first 30 days, every post is sent to you for approval before it goes live. After that, you choose your level of control — always manual, always automatic, or anything in between.",
          },
        },
        {
          "@type": "Question",
          "name": "Will my WhatsApp account get banned?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SuperStatus is built with account safety as a first priority. We use smart pacing, warm-up sequences, and human-like posting patterns that keep your WhatsApp number safe.",
          },
        },
        {
          "@type": "Question",
          "name": "Who is SuperStatus built for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SuperStatus is built for Nigerian and African freelancers, content creators, small business owners, and professionals who want to stay consistently visible to their WhatsApp network without spending hours on content creation every day.",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <BenefitsSection />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
