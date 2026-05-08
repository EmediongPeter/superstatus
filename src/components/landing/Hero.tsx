"use client";

import { useState } from "react";
import Image from "next/image";
import { WaitlistForm } from "./WaitlistForm";
import { TrendingUp, Check } from "lucide-react";

type Niche = "Freelancer" | "Creator" | "Business owner";
type DemoStep = 0 | 1 | 2;

const NICHE_OPTIONS: { emoji: string; label: Niche }[] = [
  { emoji: "💼", label: "Freelancer" },
  { emoji: "🎨", label: "Creator" },
  { emoji: "🏪", label: "Business owner" },
];

const DEMO_POSTS: Record<Niche, string> = {
  Freelancer:
    "Closed a ₦500k project this week. It started with one status post. Show up consistently and clients come to you 💪",
  Creator:
    "From 0 to 15k views last week. Same audience. Different strategy. I just showed up every single day 🔥",
  "Business owner":
    "Someone DM'd me after seeing my status: 'Are you still selling?' Yes. Always. Your WhatsApp reach is bigger than you think 🛍️",
};

/* ── Background SVG ─────────────────────────────────────────────── */
function HeroBackground() {
  return (
    <svg
      className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] pointer-events-none select-none"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 200 50 
           C 230 30, 260 30, 290 50 
           S 350 70, 360 110 
           S 400 150, 390 190 
           S 420 240, 390 280 
           S 380 350, 340 370 
           S 270 400, 230 380 
           S 160 400, 120 380 
           S 50 360, 40 320 
           S 0 270, 10 230 
           S -20 170, 10 130 
           S 40 60, 80 50 
           S 150 30, 200 50 
           Z"
        fill="#25D366"
        fillOpacity="0.14"
      />
    </svg>
  );
}




/* ── Outcome chip (floating stat pill) ─────────────────────────── */
function OutcomeChip({
  children,
  className,
  bg = "#ffffff",
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-1.5 px-3 py-1.5 ${className ?? ""}`}
      style={{
        backgroundColor: bg,
        border: "2px solid #141413",
        borderRadius: "9999px",
        boxShadow: "3px 3px 0px #141413",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

/* ── Phone status bar ───────────────────────────────────────────── */
function PhoneStatusBar() {
  return (
    <div className="h-7 flex items-center justify-between px-5 shrink-0" style={{ backgroundColor: "#075E54" }}>
      <span className="text-white/90 text-[11px] font-bold tracking-tight">9:41</span>
      <div className="flex gap-2 items-center">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="0" y="6" width="2.5" height="4" fill="white" fillOpacity="0.4" rx="0.5" />
          <rect x="3.5" y="4" width="2.5" height="6" fill="white" fillOpacity="0.6" rx="0.5" />
          <rect x="7" y="2" width="2.5" height="8" fill="white" fillOpacity="0.85" rx="0.5" />
          <rect x="10.5" y="0" width="2.5" height="10" fill="white" rx="0.5" />
        </svg>
        <svg width="20" height="11" viewBox="0 0 20 11" fill="none">
          <rect x="0.5" y="0.5" width="16" height="10" rx="2" stroke="white" strokeOpacity="0.6" />
          <rect x="2" y="2" width="10" height="7" rx="1" fill="white" />
          <path d="M 17.5 3.5 Q 19.5 5.5 17.5 7.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

/* ── WhatsApp chat header ───────────────────────────────────────── */
function PhoneChatHeader({
  demoActive,
  onExitDemo,
}: {
  demoActive: boolean;
  onExitDemo: () => void;
}) {
  return (
    <div className="px-3 py-2 flex items-center gap-2 shrink-0" style={{ backgroundColor: "#075E54" }}>
      {demoActive ? (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onExitDemo(); }}
          className="cursor-pointer bg-transparent border-none p-0 shrink-0 mr-0.5"
          aria-label="Exit demo"
        >
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
            <path d="M8 1L2 7L8 13" stroke="white" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}

      {/* Avatar */}
      <div
        className="w-9 h-9 flex items-center justify-center text-lg shrink-0"
        style={{ backgroundColor: "#25D366", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.2)" }}
      >
        ⚡
      </div>

      {/* Name + status */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-[13px] font-bold leading-tight truncate">SuperStatus</p>
        <p className="text-white/60 text-[10px] leading-tight truncate">
          {demoActive ? "interactive demo · tap ← to exit" : "online"}
        </p>
      </div>

      {/* Right icons — phone (greyed, bot can't call) + menu */}
      <div className="flex items-center gap-3.5 shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.45">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.8">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </div>
    </div>
  );
}

/* ── WhatsApp input bar ─────────────────────────────────────────── */
function PhoneInputBar() {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 shrink-0" style={{ backgroundColor: "#F0F0F0" }}>
      <span className="text-[18px] leading-none select-none cursor-default">😊</span>
      <div
        className="flex-1 px-3 py-1.5 text-[10.5px] font-medium"
        style={{ backgroundColor: "#ffffff", borderRadius: "20px", color: "rgba(20,20,19,0.35)" }}
      >
        Type a message
      </div>
      <span className="text-[18px] leading-none select-none cursor-default">🎤</span>
    </div>
  );
}

/* ── Static chat content (default preview) ──────────────────────── */
function StaticChatContent() {
  return (
    <div className="flex flex-col gap-2 px-3 py-2" style={{ height: "100%", overflow: "hidden" }}>
      {/* Date separator */}
      <div className="flex justify-center mb-0.5">
        <span
          className="text-[9px] font-medium px-3 py-0.5 rounded-full"
          style={{ backgroundColor: "rgba(0,0,0,0.08)", color: "rgba(20,20,19,0.55)" }}
        >
          Today
        </span>
      </div>

      {/* Bot intro */}
      <div className="wa-bubble-received">
        <p className="text-[10.5px] text-brand-charcoal leading-snug">
          Hey! 👋 Here&apos;s your <strong>9:00 AM</strong> status post:
        </p>
        <span className="text-[8.5px] text-brand-charcoal/40 block text-right mt-0.5">9:00</span>
      </div>

      {/* AI Draft */}
      <div className="wa-bubble-received" style={{ marginRight: "18px" }}>
        <span
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mb-1.5 text-[8px] font-black text-white rounded-full"
          style={{ backgroundColor: "#25D366" }}
        >
          ✨ AI Draft
        </span>
        <p className="text-[10px] text-brand-charcoal leading-snug font-medium">
          &quot;Lagos hustle hits different. 3 years ago I had zero clients. Today I closed my biggest deal. What changed? I stayed visible. 🔥&quot;
        </p>
        <div className="flex gap-1 mt-1.5">
          <span
            className="flex-1 py-1 text-[9px] font-black text-white text-center rounded"
            style={{ backgroundColor: "#25D366" }}
          >
            ✅ Post it
          </span>
          <span
            className="flex-1 py-1 text-[9px] font-black text-brand-charcoal text-center rounded"
            style={{ backgroundColor: "#FFCB47" }}
          >
            ✏️ Edit
          </span>
        </div>
        <span className="text-[8.5px] text-brand-charcoal/40 block text-right mt-1">9:00</span>
      </div>

      {/* User tapped Post it */}
      <div className="wa-bubble-sent">
        <p className="text-[10.5px] text-brand-charcoal">Post it 👍</p>
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <span className="text-[8.5px] text-brand-charcoal/40">9:00</span>
          <span className="text-[9px]" style={{ color: "#53BDEB" }}>✓✓</span>
        </div>
      </div>

      {/* Bot confirmation */}
      <div className="wa-bubble-received">
        <p className="text-[10.5px] text-brand-charcoal">🚀 Posted! Your status is live.</p>
        <span className="text-[8.5px] text-brand-charcoal/40 block text-right mt-0.5">9:00</span>
      </div>

      {/* New DM notification via bot */}
      <div className="wa-bubble-received" style={{ marginRight: "8px" }}>
        <p className="text-[8.5px] font-black mb-1" style={{ color: "#25D366" }}>📨 New DM</p>
        <p className="text-[10px] leading-snug" style={{ color: "rgba(20,20,19,0.85)" }}>
          <strong>Adaeze M.:</strong> &quot;Hi! Saw your status, are you still taking clients? I need a designer 🙏&quot;
        </p>
        <span className="text-[8.5px] text-brand-charcoal/40 block text-right mt-0.5">9:05</span>
      </div>
    </div>
  );
}

/* ── Demo step 0 — pick niche ───────────────────────────────────── */
function DemoStepNiche({ onNicheSelect }: { onNicheSelect: (n: Niche) => void }) {
  return (
    <div className="flex flex-col gap-2.5 px-3 py-2" style={{ height: "100%", overflow: "hidden" }}>
      <div className="wa-bubble-received">
        <p className="text-[11px] text-brand-charcoal leading-snug font-medium">
          Hey! 👋 I&apos;m SuperStatus. Let me write your first post. What&apos;s your niche?
        </p>
        <span className="text-[8.5px] text-brand-charcoal/40 block text-right mt-0.5">now</span>
      </div>

      <div className="flex flex-col gap-1.5 pl-1">
        {NICHE_OPTIONS.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onNicheSelect(opt.label)}
            className="flex items-center gap-2 px-3 py-2 text-left w-full transition-all duration-100 active:scale-95"
            style={{
              backgroundColor: "#ffffff",
              border: "1.5px solid #25D366",
              borderRadius: "8px",
              boxShadow: "2px 2px 0px rgba(37,211,102,0.3)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0px rgba(37,211,102,0.5)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0px rgba(37,211,102,0.3)"; }}
          >
            <span className="text-base">{opt.emoji}</span>
            <span className="text-[11px] font-bold text-brand-charcoal">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Demo step 1 — generating ───────────────────────────────────── */
function DemoStepGenerating({ selectedNiche }: { selectedNiche: Niche }) {
  return (
    <div className="flex flex-col gap-2.5 px-3 py-2" style={{ height: "100%", overflow: "hidden" }}>
      <div className="wa-bubble-received">
        <p className="text-[11px] text-brand-charcoal leading-snug font-medium">
          Hey! 👋 I&apos;m SuperStatus. Let me write your first post. What&apos;s your niche?
        </p>
        <span className="text-[8.5px] text-brand-charcoal/40 block text-right mt-0.5">now</span>
      </div>

      <div className="wa-bubble-sent">
        <p className="text-[11px] font-bold text-brand-charcoal">{selectedNiche}</p>
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <span className="text-[8.5px] text-brand-charcoal/40">now</span>
          <span className="text-[9px]" style={{ color: "#53BDEB" }}>✓✓</span>
        </div>
      </div>

      <div className="wa-bubble-received">
        <div className="flex items-center gap-1.5 py-0.5 px-1">
          <span className="typing-dot w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#B0AEA5" }} />
          <span className="typing-dot w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#B0AEA5" }} />
          <span className="typing-dot w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#B0AEA5" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Demo step 2 — show post ────────────────────────────────────── */
function DemoStepPost({
  selectedNiche,
  onTryAgain,
}: {
  selectedNiche: Niche;
  onTryAgain: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 px-3 py-2" style={{ height: "100%", overflow: "hidden" }}>
      <div className="wa-bubble-sent">
        <p className="text-[11px] font-bold text-brand-charcoal">{selectedNiche}</p>
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <span className="text-[8.5px] text-brand-charcoal/40">now</span>
          <span className="text-[9px]" style={{ color: "#53BDEB" }}>✓✓</span>
        </div>
      </div>

      <div className="wa-bubble-received" style={{ marginRight: "18px" }}>
        <span
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mb-1.5 text-[8px] font-black text-white rounded-full"
          style={{ backgroundColor: "#25D366" }}
        >
          ✨ Your AI Post
        </span>
        <p className="text-[10px] text-brand-charcoal leading-snug font-medium">
          {DEMO_POSTS[selectedNiche]}
        </p>
        <div className="flex gap-1 mt-1.5">
          <span
            className="flex-1 py-1 text-[9px] font-black text-white text-center rounded"
            style={{ backgroundColor: "#25D366" }}
          >
            ✅ Post it
          </span>
          <span
            className="flex-1 py-1 text-[9px] font-black text-brand-charcoal text-center rounded"
            style={{ backgroundColor: "#FFCB47" }}
          >
            ✏️ Edit
          </span>
        </div>
        <span className="text-[8.5px] text-brand-charcoal/40 block text-right mt-1">now</span>
      </div>

      <div
        className="px-2.5 py-2 text-center rounded"
        style={{ backgroundColor: "#141413" }}
      >
        <p className="text-[9.5px] font-black text-white">
          Ready to automate this? Join the waitlist ↑
        </p>
      </div>

      <button
        type="button"
        onClick={onTryAgain}
        className="text-[9px] text-brand-gray underline self-center cursor-pointer bg-transparent border-none"
      >
        Try another niche
      </button>
    </div>
  );
}

/* ── Bot chat mockup (phone frame) ──────────────────────────────── */
function BotChatMockup({
  demoActive,
  demoStep,
  selectedNiche,
  onNicheSelect,
  onActivateDemo,
  onExitDemo,
  onTryAgain,
}: {
  demoActive: boolean;
  demoStep: DemoStep;
  selectedNiche: Niche | null;
  onNicheSelect: (n: Niche) => void;
  onActivateDemo: () => void;
  onExitDemo: () => void;
  onTryAgain: () => void;
}) {
  return (
    <div className="relative mx-auto w-[240px] xl:w-[292px]">

      {/* "Try it here" arrow — left of phone, points at mockup */}
      {!demoActive && (
        <button
          type="button"
          onClick={onActivateDemo}
          className="absolute z-30 -left-36 xl:-left-40 bottom-20 cursor-pointer bg-transparent border-none p-0"
          aria-label="Try the interactive demo"
        >
          <Image
            src="/try-it-arrow.png"
            alt="try it here"
            width={124}
            height={108}
            style={{ mixBlendMode: "multiply", opacity: 0.74 }}
          />
        </button>
      )}

      {/* Outcome chips — static preview only */}
      {!demoActive && (
        <>
          <OutcomeChip className="-top-5 -right-12 animate-float" bg="#DCF8C6">
            <Check className="w-3 h-3 text-brand-green-dark" strokeWidth={3} />
            <span className="text-[11px] font-black text-brand-charcoal">Posted at 9:00 AM</span>
          </OutcomeChip>
          <OutcomeChip className="-bottom-5 -left-14 animate-float-slow" bg="#FFCB47">
            <TrendingUp className="w-3 h-3 text-brand-charcoal" />
            <span className="text-[11px] font-black text-brand-charcoal">+12 DMs this week</span>
          </OutcomeChip>
        </>
      )}

      {/* Phone frame */}
      <div
        className="relative overflow-hidden flex flex-col"
        onClick={!demoActive ? onActivateDemo : undefined}
        style={{
          width: "100%",
          height: 548,
          border: "3px solid #141413",
          borderRadius: "32px",
          boxShadow: demoActive ? "6px 6px 0px #25D366" : "8px 8px 0px #141413",
          transform: demoActive ? "rotate(0deg)" : "rotate(1.5deg)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          backgroundColor: "#ECE5DD",
          cursor: demoActive ? "default" : "pointer",
        }}
      >
        <PhoneStatusBar />
        <PhoneChatHeader demoActive={demoActive} onExitDemo={onExitDemo} />

        {/* Chat body */}
        <div className="flex-1 overflow-hidden" style={{ backgroundColor: "#ECE5DD" }}>
          {!demoActive && <StaticChatContent />}
          {demoActive && demoStep === 0 && <DemoStepNiche onNicheSelect={onNicheSelect} />}
          {demoActive && demoStep === 1 && selectedNiche && <DemoStepGenerating selectedNiche={selectedNiche} />}
          {demoActive && demoStep === 2 && selectedNiche && (
            <DemoStepPost selectedNiche={selectedNiche} onTryAgain={onTryAgain} />
          )}
        </div>

        <PhoneInputBar />
      </div>
    </div>
  );
}

/* ── Avatar stack ───────────────────────────────────────────────── */
function AvatarStack() {
  const avatars = [
    "/avatars/23_05_09_user_pick_and_emotions_1_similars_flat_43.svg",
    "/avatars/2d800191-fe2a-4f40-9f32-d6aeb7bde3df.svg",
    "/avatars/49c4842c-c20e-4466-8947-edc796c2d20f.svg",
    "/avatars/4a901fe2-2b0f-476e-bd81-14e859f0a9e1.svg",
    "/avatars/54b19ada-d53e-4ee9-8882-9dfed1bf1396.svg",
  ];

  return (
    <div className="flex items-center gap-2.5 justify-center lg:justify-start flex-nowrap">
      <div className="flex -space-x-3 flex-nowrap">
        {avatars.map((src, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-full overflow-hidden shrink-0 relative"
            style={{ backgroundColor: "#DCF8C6", border: "2px solid #141413" }}
          >
            <Image
              src={src}
              alt={`Creator ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <p className="text-xs sm:text-sm text-brand-charcoal font-medium whitespace-nowrap">
        <span className="font-black">147+</span>{" "}
        <span className="text-brand-gray">creators joined</span>
      </p>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────────── */
export function Hero() {
  const [demoActive, setDemoActive] = useState(false);
  const [demoStep, setDemoStep] = useState<DemoStep>(0);
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);

  function activateDemo() {
    setDemoActive(true);
    setDemoStep(0);
    setSelectedNiche(null);
  }

  function exitDemo() {
    setDemoActive(false);
    setDemoStep(0);
    setSelectedNiche(null);
  }

  function tryAgain() {
    setDemoStep(0);
    setSelectedNiche(null);
  }

  function handleNicheSelect(niche: Niche) {
    setSelectedNiche(niche);
    setDemoStep(1);
    setTimeout(() => setDemoStep(2), 1800);
  }

  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-brand-cream overflow-x-hidden overflow-y-clip">
      {/* 
        Amoeba Background — Peeking from the right edge.
        On mobile: visible and half-cut off.
        On desktop: center aligned to phone mockup's top-right.
      */}
      <div
        className="absolute right-0 top-[20%] sm:top-[15%] lg:top-[12%] translate-x-1/2 lg:right-[calc(50%-40rem)] lg:translate-x-0 pointer-events-none z-0 overflow-visible"
        aria-hidden="true"
      >
        <HeroBackground />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full py-20 lg:py-28">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-10 xl:gap-16 items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">

            {/* Badge — two-tone pill */}
            <a
              href="#waitlist"
              className="inline-flex items-center hover:scale-105 transition-transform cursor-pointer overflow-hidden shrink-0"
              style={{
                border: "2px solid #141413",
                borderRadius: "9999px",
                boxShadow: "2px 2px 0px #141413",
              }}
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ backgroundColor: "#DCF8C6" }}>
                <span
                  className="w-2 h-2 rounded-full bg-brand-green shrink-0"
                // style={{ animation: "float 2s ease-in-out infinite" }}
                />
                <span className="text-xs font-black text-brand-charcoal whitespace-nowrap">Now in Beta</span>
              </div>
              {/* <div className="w-px self-stretch" style={{ backgroundColor: "rgba(20,20,19,0.25)" }} /> */}
              {/* <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ backgroundColor: "#FFCB47" }}>
                <span className="text-xs font-black text-brand-charcoal whitespace-nowrap">147 on waitlist</span>
                <span className="text-xs">🔥</span>
              </div> */}
            </a>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-[2rem] sm:text-5xl lg:text-5xl xl:text-6xl font-black text-brand-charcoal leading-[0.95] tracking-tight">
                Your network
                <br />
                is watching.
              </h1>
              <div className="text-[1.625rem] sm:text-4xl lg:text-4xl xl:text-5xl font-black leading-[1.2] tracking-tight">
                <span className="text-brand-charcoal/50">Are you </span>
                <span className="highlight-yellow">showing up?</span>
              </div>
            </div>

            {/* Sub copy */}
            <p className="text-base xl:text-lg text-brand-charcoal/70 leading-relaxed max-w-md font-medium">
              Hundreds of creators post to WhatsApp Status every single day, on autopilot.{" "}
              <strong className="text-brand-charcoal">
                AI writes the content, sends it to your WhatsApp, you approve in one tap, and it posts automatically.
              </strong>{" "}
              Clients slide into your DMs. You close the deals.
            </p>

            {/* Form */}
            <div className="w-full max-w-lg" id="waitlist">
              <WaitlistForm variant="light" />
              <p className="text-xs text-brand-gray mt-2.5 font-medium">
                No credit card. First 500 users get a lifetime deal.
              </p>
            </div>

            {/* Social proof */}
            <AvatarStack />
          </div>

          {/* Right — phone mockup (desktop only) */}
          <div className="relative hidden lg:flex justify-center lg:justify-end lg:pr-6 xl:pr-8 pt-12">
            <BotChatMockup
              demoActive={demoActive}
              demoStep={demoStep}
              selectedNiche={selectedNiche}
              onNicheSelect={handleNicheSelect}
              onActivateDemo={activateDemo}
              onExitDemo={exitDemo}
              onTryAgain={tryAgain}
            />
          </div>
        </div>
      </div>

      {/*
        Wave clip — fully inside the section (no overflow needed).
        White fill below the wave paints over the hero's cream background,
        making the section visually end at the wave boundary.
        Wave bumps go DOWN (y=42), valleys go UP (y=14).
      */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 56, zIndex: 20 }}
      >
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-full">
          {/* White fill below wave — overwrites hero cream, simulates clipped edge */}
          <path
            d="M -10 14 C 30 14 50 42 120 42 C 190 42 210 14 240 14 C 290 14 310 42 360 42 C 410 42 430 14 480 14 C 530 14 550 42 600 42 C 650 42 670 14 720 14 C 770 14 790 42 840 42 C 890 42 910 14 960 14 C 1010 14 1030 42 1080 42 C 1130 42 1150 14 1200 14 C 1250 14 1270 42 1320 42 C 1370 42 1390 14 1450 14 L 1450 56 L -10 56 Z"
            fill="#ffffff"
          />
          {/* Dark wave stroke — the bottom border of the hero */}
          <path
            d="M -10 14 C 30 14 50 42 120 42 C 190 42 210 14 240 14 C 290 14 310 42 360 42 C 410 42 430 14 480 14 C 530 14 550 42 600 42 C 650 42 670 14 720 14 C 770 14 790 42 840 42 C 890 42 910 14 960 14 C 1010 14 1030 42 1080 42 C 1130 42 1150 14 1200 14 C 1250 14 1270 42 1320 42 C 1370 42 1390 14 1450 14"
            fill="none"
            stroke="#141413"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
