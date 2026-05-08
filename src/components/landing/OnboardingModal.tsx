"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X, Check, ChevronDown } from "lucide-react";
import { DIAL_CODES } from "@/lib/dialCodes";

interface Props {
  email: string;
  onDone: () => void;
}

interface Answers {
  name: string;
  countryDial: string;
  whatsapp: string;
  niche: string;
  nicheOther: string;
  frequency: string;
  blockers: string[];
  dream: string;
  fear: string;
  audience: string;
  income: string;
  willingToPay: string;
  willingPrice: string;
}

const TOTAL = 11;

const NICHE_OPTIONS = [
  { value: "freelancer",     label: "Freelancer",       sub: "Designer, developer, writer, consultant…" },
  { value: "creator",        label: "Content creator",   sub: "Videos, photos, tutorials, courses…" },
  { value: "business_owner", label: "Business owner",    sub: "Products, services, retail, food…" },
  { value: "student",        label: "Student",           sub: "Building your network before you graduate" },
  { value: "other",          label: "Something else",    sub: "Tell us what you do" },
];

const FREQUENCY_OPTIONS = [
  { value: "never",      label: "Never — I keep meaning to start" },
  { value: "rarely",     label: "Once in a while, when I remember" },
  { value: "sometimes",  label: "A few times a week but I can't keep it up" },
  { value: "consistent", label: "Pretty consistently already" },
];

const BLOCKER_OPTIONS = [
  { value: "forget",          label: "I just forget" },
  { value: "dont_know_what",  label: "I don't know what to say" },
  { value: "not_interesting", label: "My life doesn't feel interesting enough to post about" },
  { value: "overthink",       label: "I start drafting, then delete it" },
  { value: "no_time",         label: "I genuinely don't have the time" },
  { value: "judgment",        label: "I'm not sure what people will think" },
];

const DREAM_OPTIONS = [
  { value: "clients",   label: "More client inquiries coming in" },
  { value: "known",     label: "People finally knowing what I do" },
  { value: "sales",     label: "More sales from my existing contacts" },
  { value: "invisible", label: "Stopping feeling invisible online" },
  { value: "habit",     label: "Just having a consistent habit I can actually stick to" },
];

const FEAR_OPTIONS = [
  { value: "sounds_wrong",   label: "What if it sounds off or not like me?" },
  { value: "ban",            label: "What if my WhatsApp account gets flagged?" },
  { value: "wrong_post",     label: "What if it posts something wrong at the wrong time?" },
  { value: "want_approval",  label: "I'd want to approve every post before it goes live" },
  { value: "nothing",        label: "Nothing — just make it work" },
];

const AUDIENCE_OPTIONS = [
  { value: "under_200",  label: "Under 200 contacts" },
  { value: "200_500",    label: "200–500 contacts" },
  { value: "500_1000",   label: "500–1,000 contacts" },
  { value: "over_1000",  label: "Over 1,000 contacts" },
];

const INCOME_OPTIONS = [
  { value: "just_starting", label: "Just starting out",     sub: "Little or no income yet" },
  { value: "under_500",     label: "Under $500/mo",         sub: "" },
  { value: "500_2k",        label: "$500–$2,000/mo",        sub: "" },
  { value: "2k_5k",         label: "$2,000–$5,000/mo",      sub: "" },
  { value: "5k_plus",       label: "$5,000+/mo",            sub: "" },
  { value: "prefer_not",    label: "Prefer not to say",     sub: "" },
];

const WTP_OPTIONS = [
  { value: "yes",          label: "Yes, definitely" },
  { value: "maybe",        label: "Maybe, depends on the price" },
  { value: "probably_not", label: "Probably not" },
];

const PRICE_OPTIONS = [
  { value: "under_5",  label: "Under $5/mo" },
  { value: "5_10",     label: "$5–$10/mo" },
  { value: "10_20",    label: "$10–$20/mo" },
  { value: "20_50",    label: "$20–$50/mo" },
  { value: "over_50",  label: "Over $50/mo" },
];

function getPersonalizedMessage(answers: Answers): { headline: string; body: string } {
  const { blockers, dream, fear } = answers;

  if (blockers.includes("dont_know_what")) {
    return {
      headline: "Your story is already the content.",
      body: "SuperStatus will help you tell it every single day — without the blank-page panic or guessing what to write.",
    };
  }
  if (blockers.includes("no_time")) {
    return {
      headline: "Your contacts already trust you. They just need to see you.",
      body: "SuperStatus runs quietly in the background so your presence stays consistent even when you have zero time to think about it.",
    };
  }
  if (fear === "want_approval" || fear === "sounds_wrong") {
    return {
      headline: "You stay in control. Always.",
      body: "Every post goes through you before it goes live. Think of it as a very fast, very reliable content assistant — not an autopilot you can't stop.",
    };
  }
  if (dream === "invisible") {
    return {
      headline: "The people who show up every day are the ones who stop being invisible.",
      body: "That's the only game that exists on WhatsApp Status — and we're going to help you win it.",
    };
  }
  if (blockers.includes("forget") && dream === "clients") {
    return {
      headline: "The clients who remember you are the ones who see you every day.",
      body: "You won't have to remember. SuperStatus makes sure you're visible even on the days life gets in the way.",
    };
  }
  return {
    headline: "Consistency is the only unfair advantage that's actually fair.",
    body: "SuperStatus will keep you visible to your entire network, every single day. We're building this for people exactly like you.",
  };
}

/* ── Custom country dial code selector ──────────────────────────── */
function DialSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const filtered = DIAL_CODES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search)
  );

  return (
    <div ref={containerRef} className="relative shrink-0" style={{ zIndex: 10 }}>
      {/* Trigger — shows dial code only */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="h-full flex items-center gap-1 px-3 font-black text-brand-charcoal bg-white"
        style={{
          fontSize: 15,
          border: "2px solid #141413",
          borderRight: "none",
          borderRadius: "12px 0 0 12px",
          boxShadow: "0 4px 0px #141413",
          minWidth: 72,
          cursor: "pointer",
          touchAction: "manipulation",
          whiteSpace: "nowrap",
        }}
      >
        {value}
        <ChevronDown
          className="w-3 h-3 shrink-0 transition-transform duration-150"
          style={{ opacity: 0.4, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown — shows dial + name */}
      {open && (
        <div
          className="absolute left-0 top-full mt-1 bg-white flex flex-col"
          style={{
            width: 240,
            maxHeight: 260,
            border: "2px solid #141413",
            borderRadius: "12px",
            boxShadow: "4px 4px 0px #141413",
            overflow: "hidden",
          }}
        >
          <div className="p-2 shrink-0" style={{ borderBottom: "1px solid #E8E6DC" }}>
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search country…"
              className="w-full px-3 py-2 font-medium text-brand-charcoal placeholder:text-brand-charcoal/30 outline-none"
              style={{ fontSize: 14, border: "1.5px solid #E8E6DC", borderRadius: "8px", backgroundColor: "#FAF9F5" }}
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-brand-charcoal/40 font-medium">No results</p>
            ) : filtered.map(c => (
              <button
                key={`${c.code}-${c.dial}`}
                type="button"
                onClick={() => { onChange(c.dial); setOpen(false); setSearch(""); }}
                className="w-full text-left px-4 py-2.5 flex items-center gap-2 transition-colors hover:bg-brand-cream"
                style={{ cursor: "pointer", touchAction: "manipulation" }}
              >
                <span className="font-black text-sm text-brand-charcoal w-11 shrink-0">{c.dial}</span>
                <span className="text-sm text-brand-charcoal/55 font-medium truncate">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Option card ─────────────────────────────────────────────────── */
function OptionCard({
  label, sub, selected, onClick, multi, shortcut,
}: {
  label: string; sub?: string; selected: boolean; onClick: () => void;
  multi?: boolean; shortcut?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-5 py-4 flex items-center gap-3.5 transition-all duration-150"
      style={{
        backgroundColor: selected ? "#D97757" : "#ffffff",
        color: selected ? "#ffffff" : "#141413",
        border: `2px solid ${selected ? "#D97757" : "#E8E6DC"}`,
        borderRadius: "12px",
        boxShadow: selected ? "4px 4px 0px #141413" : "4px 4px 0px #E8E6DC",
        cursor: "pointer",
        touchAction: "manipulation",
      }}
    >
      {multi ? (
        <div
          className="w-5 h-5 flex items-center justify-center shrink-0 rounded-sm transition-all"
          style={{
            border: `2px solid ${selected ? "rgba(255,255,255,0.6)" : "rgba(20,20,19,0.25)"}`,
            backgroundColor: selected ? "rgba(255,255,255,0.25)" : "transparent",
          }}
        >
          {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </div>
      ) : shortcut ? (
        <div
          className="w-7 h-7 flex items-center justify-center shrink-0 font-black text-xs"
          style={{
            backgroundColor: selected ? "rgba(255,255,255,0.2)" : "rgba(20,20,19,0.06)",
            color: selected ? "#ffffff" : "rgba(20,20,19,0.4)",
            border: `1.5px solid ${selected ? "rgba(255,255,255,0.3)" : "rgba(20,20,19,0.15)"}`,
            borderRadius: "6px",
          }}
        >
          {shortcut}
        </div>
      ) : null}
      <div className="flex-1">
        <span className="font-black text-sm sm:text-base block leading-snug">{label}</span>
        {sub && <span className="text-xs mt-0.5 block opacity-60 font-medium">{sub}</span>}
      </div>
    </button>
  );
}

/* ── Shared action button ────────────────────────────────────────── */
function ActionBtn({
  onClick, label = "Continue", disabled, green, type = "button",
}: {
  onClick?: () => void; label?: string; disabled?: boolean; green?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:py-3 font-black text-sm transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
      style={{
        backgroundColor: green ? "#25D366" : "#141413",
        color: green ? "#141413" : "#ffffff",
        border: "2px solid #141413",
        borderRadius: "10px",
        boxShadow: disabled ? "none" : "4px 4px 0px #141413",
        cursor: disabled ? "not-allowed" : "pointer",
        touchAction: "manipulation",
      }}
    >
      {label} {!disabled && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}

/* ── Skip link ───────────────────────────────────────────────────── */
function Skip({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button" onClick={onClick}
      className="text-sm font-semibold transition-colors hover:opacity-70"
      style={{ color: "rgba(20,20,19,0.3)", cursor: "pointer", touchAction: "manipulation" }}
    >
      Skip →
    </button>
  );
}

/* ── Inline label ────────────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "rgba(20,20,19,0.3)" }}>
      {children}
    </p>
  );
}

/* ── Question title ──────────────────────────────────────────────── */
function QTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-4xl font-black text-brand-charcoal leading-tight mb-3">
      {children}
    </h2>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export function OnboardingModal({ email, onDone }: Props) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [dir, setDir] = useState<1 | -1>(1);
  const [screenVisible, setScreenVisible] = useState(false); // full-screen entry/exit
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Answers>({
    name: "", countryDial: "+1", whatsapp: "",
    niche: "", nicheOther: "", frequency: "", blockers: [],
    dream: "", fear: "", audience: "",
    income: "", willingToPay: "", willingPrice: "",
  });
  const [waError, setWaError] = useState("");

  const hi = answers.name ? `${answers.name}, ` : "";

  // Full-screen entry animation
  useEffect(() => {
    const t = setTimeout(() => setScreenVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // IP-based country code detection
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(data => {
        if (data.country_calling_code) {
          setAnswers(a => ({ ...a, countryDial: data.country_calling_code }));
        }
      })
      .catch(() => {});
  }, []);

  function transition(fn: () => void, direction: 1 | -1 = 1) {
    setDir(direction);
    setPhase("out");
    setTimeout(() => { fn(); setPhase("in"); }, 190);
  }

  function advance() { transition(() => setStep(s => s + 1), 1); }
  function back()    { if (step > 0) transition(() => setStep(s => s - 1), -1); }

  function pick(
    field: keyof Pick<Answers, "frequency" | "dream" | "fear" | "audience" | "willingToPay">,
    value: string,
  ) {
    setAnswers(a => ({ ...a, [field]: value }));
    setTimeout(advance, 300);
  }

  function toggleBlocker(value: string) {
    setAnswers(a => ({
      ...a,
      blockers: a.blockers.includes(value)
        ? a.blockers.filter(b => b !== value)
        : [...a.blockers, value],
    }));
  }

  async function submit() {
    setSubmitting(true);
    const digits = answers.whatsapp.replace(/\D/g, "");
    const whatsappFull = digits ? `${answers.countryDial}${digits}` : null;
    const niche = answers.niche === "other"
      ? (answers.nicheOther.trim() || "other")
      : (answers.niche || null);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: answers.name || null,
          whatsapp_number: whatsappFull,
          niche,
          frequency: answers.frequency || null,
          blockers: answers.blockers.length ? answers.blockers : null,
          dream_outcome: answers.dream || null,
          biggest_fear: answers.fear || null,
          audience_size: answers.audience || null,
          income_bracket: answers.income || null,
          willing_to_pay: answers.willingToPay || null,
          willing_price: answers.willingPrice || null,
          completed_onboarding: true,
        }),
      });
    } catch { /* best-effort */ }
    setSubmitting(false);
    transition(() => setDone(true), 1);
  }

  function handleClose() {
    // Animate the whole screen out first
    setScreenVisible(false);
    setTimeout(() => {
      if (!done) {
        fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }).catch(() => {});
      }
      onDone();
    }, 380);
  }

  const slideStyle: React.CSSProperties = {
    opacity: phase === "in" ? 1 : 0,
    transform: phase === "in" ? "translateY(0)" : `translateY(${dir * -14}px)`,
    transition: phase === "in"
      ? "opacity 0.22s ease, transform 0.22s ease"
      : "opacity 0.19s ease, transform 0.19s ease",
  };

  const screenStyle: React.CSSProperties = {
    opacity: screenVisible ? 1 : 0,
    transform: screenVisible ? "translateY(0)" : "translateY(20px)",
    transition: screenVisible
      ? "opacity 0.4s ease, transform 0.4s ease"
      : "opacity 0.32s ease, transform 0.32s ease",
  };

  const progress = done ? 100 : (step / (TOTAL - 1)) * 100;
  const shortcuts = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: "#FAF9F5", ...screenStyle }}>

      {/* Progress bar */}
      <div className="h-1 shrink-0" style={{ backgroundColor: "#E8E6DC" }}>
        <div style={{ width: `${progress}%`, height: "100%", backgroundColor: "#D97757", transition: "width 0.45s ease" }} />
      </div>

      {/* Top nav */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 shrink-0">
        {!done ? (
          <button
            type="button" onClick={back} disabled={step === 0}
            className="flex items-center gap-1.5 text-sm font-black transition-all duration-150 disabled:opacity-0 disabled:pointer-events-none"
            style={{ color: "rgba(20,20,19,0.4)", cursor: "pointer", touchAction: "manipulation" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
        ) : <div />}

        {!done && (
          <span className="text-xs font-black tabular-nums" style={{ color: "rgba(20,20,19,0.2)" }}>
            {step + 1} <span style={{ color: "rgba(20,20,19,0.12)" }}>/</span> {TOTAL}
          </span>
        )}

        <button
          type="button" onClick={handleClose}
          className="flex items-center justify-center w-8 h-8 transition-colors hover:opacity-60"
          style={{
            color: "rgba(20,20,19,0.35)",
            border: "1.5px solid rgba(20,20,19,0.12)",
            borderRadius: "8px",
            cursor: "pointer",
            touchAction: "manipulation",
          }}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col justify-start sm:justify-center px-5 sm:px-8 pt-6 sm:pt-10 pb-24 sm:pb-10">
          <div className="w-full max-w-[560px] mx-auto" style={slideStyle}>

            {/* ── Success screen ──────────────────────────────────── */}
            {done && (() => {
              const msg = getPersonalizedMessage(answers);
              return (
                <div className="text-center">
                  <div
                    className="w-20 h-20 flex items-center justify-center mx-auto mb-7"
                    style={{ backgroundColor: "#DCF8C6", border: "3px solid #141413", borderRadius: "20px", boxShadow: "5px 5px 0px #141413" }}
                  >
                    <Check className="w-10 h-10 text-brand-charcoal" strokeWidth={3} />
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black text-brand-charcoal mb-4 leading-tight">
                    {answers.name ? `You're in, ${answers.name}.` : "You're in."}
                  </h2>
                  <p className="text-xl font-black text-brand-charcoal mb-3 leading-snug">{msg.headline}</p>
                  <p className="text-base text-brand-charcoal/55 font-medium mb-8 leading-relaxed max-w-md mx-auto">
                    {msg.body}
                  </p>
                  <div
                    className="inline-flex items-center gap-3 px-5 py-3.5 mb-8 text-left"
                    style={{ backgroundColor: "#ffffff", border: "2px solid #E8E6DC", borderRadius: "12px" }}
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center shrink-0 text-sm font-black"
                      style={{ backgroundColor: "#DCF8C6", border: "2px solid #141413", borderRadius: "8px" }}
                    >✓</div>
                    <p className="text-sm text-brand-charcoal/55 font-medium">
                      We&apos;ll reach out to <span className="font-black text-brand-charcoal/80">{email}</span> when early access opens.
                    </p>
                  </div>
                  <div>
                    <button
                      type="button" onClick={handleClose}
                      className="text-sm font-black transition-colors hover:opacity-60"
                      style={{ color: "rgba(20,20,19,0.35)", cursor: "pointer", touchAction: "manipulation" }}
                    >
                      ← Back to the page
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* ── Step 0: Name ──────────────────────────────────────── */}
            {!done && step === 0 && (
              <div>
                <Label>Before anything else —</Label>
                <QTitle>What should we call you?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">So we can make this feel a little more personal.</p>
                <input
                  type="text" autoFocus
                  value={answers.name}
                  onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))}
                  onKeyDown={e => { if (e.key === "Enter") advance(); }}
                  placeholder="Your first name"
                  className="w-full px-5 py-4 font-semibold text-brand-charcoal placeholder:text-brand-charcoal/25 outline-none bg-white"
                  style={{ fontSize: 16, border: "2px solid #141413", borderRadius: "12px", boxShadow: "4px 4px 0px #141413" }}
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-6">
                  <ActionBtn onClick={advance} label={answers.name.trim() ? "That's me" : "Continue"} />
                  {!answers.name.trim() && <Skip onClick={advance} />}
                </div>
              </div>
            )}

            {/* ── Step 1: WhatsApp ───────────────────────────────────── */}
            {!done && step === 1 && (
              <div>
                <Label>{answers.name ? `Good to meet you, ${answers.name}.` : "One more thing —"}</Label>
                <QTitle>What&apos;s your WhatsApp number?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">
                  Our bot will reach out when you&apos;re ready to start.
                </p>
                <div className="flex items-stretch">
                  <DialSelect
                    value={answers.countryDial}
                    onChange={v => setAnswers(a => ({ ...a, countryDial: v }))}
                  />
                  <input
                    type="tel" autoFocus
                    value={answers.whatsapp}
                    onChange={e => {
                      const raw = e.target.value.replace(/[^\d\s\-().]/g, "");
                      setAnswers(a => ({ ...a, whatsapp: raw }));
                      setWaError("");
                    }}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        const d = answers.whatsapp.replace(/\D/g, "");
                        if (d.length < 6) { setWaError("Enter a valid number"); return; }
                        setWaError(""); advance();
                      }
                    }}
                    placeholder="803 000 0000"
                    className="flex-1 min-w-0 px-5 py-4 font-semibold text-brand-charcoal placeholder:text-brand-charcoal/25 outline-none bg-white"
                    style={{ fontSize: 16, border: "2px solid #141413", borderRadius: "0 12px 12px 0", boxShadow: "0 4px 0px #141413" }}
                  />
                </div>
                {waError && <p className="text-sm text-red-600 font-semibold mt-2">{waError}</p>}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-6">
                  <ActionBtn
                    onClick={() => {
                      const d = answers.whatsapp.replace(/\D/g, "");
                      if (answers.whatsapp && d.length < 6) { setWaError("Enter a valid number"); return; }
                      setWaError(""); advance();
                    }}
                    label="Continue"
                  />
                  <Skip onClick={advance} />
                </div>
              </div>
            )}

            {/* ── Step 2: Niche ──────────────────────────────────────── */}
            {!done && step === 2 && (
              <div>
                <Label>{answers.name ? `Hey ${answers.name}!` : "Quick question —"}</Label>
                <QTitle>What best describes what you do?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">
                  This helps us personalise SuperStatus for your situation.
                </p>
                <div className="flex flex-col gap-3">
                  {NICHE_OPTIONS.map((o, i) => (
                    <OptionCard
                      key={o.value} label={o.label} sub={o.value !== "other" ? o.sub : undefined}
                      selected={answers.niche === o.value}
                      onClick={() => {
                        setAnswers(a => ({ ...a, niche: o.value }));
                        if (o.value !== "other") setTimeout(advance, 300);
                      }}
                      shortcut={shortcuts[i]}
                    />
                  ))}
                </div>

                {/* "Something else" expands an input */}
                {answers.niche === "other" && (
                  <div className="mt-4">
                    <input
                      type="text" autoFocus
                      value={answers.nicheOther}
                      onChange={e => setAnswers(a => ({ ...a, nicheOther: e.target.value }))}
                      onKeyDown={e => { if (e.key === "Enter" && answers.nicheOther.trim()) advance(); }}
                      placeholder="Tell us what you do…"
                      className="w-full px-5 py-4 font-semibold text-brand-charcoal placeholder:text-brand-charcoal/25 outline-none bg-white"
                      style={{ fontSize: 16, border: "2px solid #141413", borderRadius: "12px", boxShadow: "4px 4px 0px #141413" }}
                    />
                    <div className="flex items-center gap-5 mt-4">
                      <ActionBtn onClick={advance} label="Continue" disabled={!answers.nicheOther.trim()} />
                    </div>
                  </div>
                )}

                {answers.niche === "" && (
                  <div className="mt-5"><Skip onClick={advance} /></div>
                )}
              </div>
            )}

            {/* ── Step 3: Frequency ─────────────────────────────────── */}
            {!done && step === 3 && (
              <div>
                <Label>{hi}be honest with us.</Label>
                <QTitle>How often do you actually post to WhatsApp Status right now?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">No judgment — this is just where most people start.</p>
                <div className="flex flex-col gap-3">
                  {FREQUENCY_OPTIONS.map((o, i) => (
                    <OptionCard key={o.value} label={o.label} selected={answers.frequency === o.value}
                      onClick={() => pick("frequency", o.value)} shortcut={shortcuts[i]} />
                  ))}
                </div>
                <div className="mt-5"><Skip onClick={advance} /></div>
              </div>
            )}

            {/* ── Step 4: Blockers (multi) ──────────────────────────── */}
            {!done && step === 4 && (
              <div>
                <Label>This one matters most.</Label>
                <QTitle>When you don&apos;t post, what&apos;s going on?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">
                  Pick everything that fits — this shapes what we build first.
                </p>
                <div className="flex flex-col gap-3 mb-6">
                  {BLOCKER_OPTIONS.map(o => (
                    <OptionCard key={o.value} label={o.label} selected={answers.blockers.includes(o.value)}
                      onClick={() => toggleBlocker(o.value)} multi />
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  {answers.blockers.length > 0
                    ? <ActionBtn onClick={advance} />
                    : <Skip onClick={advance} />
                  }
                </div>
              </div>
            )}

            {/* ── Step 5: Dream ─────────────────────────────────────── */}
            {!done && step === 5 && (
              <div>
                <Label>{hi}if it actually worked —</Label>
                <QTitle>What would change in your life if you showed up on Status consistently?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">Pick the one that hits closest to home.</p>
                <div className="flex flex-col gap-3">
                  {DREAM_OPTIONS.map((o, i) => (
                    <OptionCard key={o.value} label={o.label} selected={answers.dream === o.value}
                      onClick={() => pick("dream", o.value)} shortcut={shortcuts[i]} />
                  ))}
                </div>
                <div className="mt-5"><Skip onClick={advance} /></div>
              </div>
            )}

            {/* ── Step 6: Fear ──────────────────────────────────────── */}
            {!done && step === 6 && (
              <div>
                <Label>One honest question.</Label>
                <QTitle>What would make you nervous about letting something post on your behalf?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">
                  This directly shapes what we build into the approval flow.
                </p>
                <div className="flex flex-col gap-3">
                  {FEAR_OPTIONS.map((o, i) => (
                    <OptionCard key={o.value} label={o.label} selected={answers.fear === o.value}
                      onClick={() => pick("fear", o.value)} shortcut={shortcuts[i]} />
                  ))}
                </div>
                <div className="mt-5"><Skip onClick={advance} /></div>
              </div>
            )}

            {/* ── Step 7: Audience ──────────────────────────────────── */}
            {!done && step === 7 && (
              <div>
                <Label>Understanding your reach —</Label>
                <QTitle>Roughly how many contacts do you have on WhatsApp?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">
                  This helps us understand the audience you&apos;re sitting on right now.
                </p>
                <div className="flex flex-col gap-3">
                  {AUDIENCE_OPTIONS.map((o, i) => (
                    <OptionCard key={o.value} label={o.label} selected={answers.audience === o.value}
                      onClick={() => pick("audience", o.value)} shortcut={shortcuts[i]} />
                  ))}
                </div>
                <div className="mt-5"><Skip onClick={advance} /></div>
              </div>
            )}

            {/* ── Step 8: Income ────────────────────────────────────── */}
            {!done && step === 8 && (
              <div>
                <Label>Almost done —</Label>
                <QTitle>Roughly what does your work earn you right now?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">
                  This shapes how we think about pricing. Completely optional.
                </p>
                <div className="flex flex-col gap-3">
                  {INCOME_OPTIONS.map((o, i) => (
                    <OptionCard key={o.value} label={o.label} sub={o.sub}
                      selected={answers.income === o.value}
                      onClick={() => { setAnswers(a => ({ ...a, income: o.value })); setTimeout(advance, 300); }}
                      shortcut={shortcuts[i]} />
                  ))}
                </div>
                <div className="mt-5"><Skip onClick={advance} /></div>
              </div>
            )}

            {/* ── Step 9: Willing to pay ────────────────────────────── */}
            {!done && step === 9 && (
              <div>
                <Label>The big question.</Label>
                <QTitle>If SuperStatus solved this for you, would you pay for it?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">
                  Be honest. It directly informs what we build and how we price it.
                </p>
                <div className="flex flex-col gap-3">
                  {WTP_OPTIONS.map((o, i) => (
                    <OptionCard key={o.value} label={o.label} selected={answers.willingToPay === o.value}
                      onClick={() => pick("willingToPay", o.value)} shortcut={shortcuts[i]} />
                  ))}
                </div>
                <div className="mt-5"><Skip onClick={advance} /></div>
              </div>
            )}

            {/* ── Step 10: Price range + submit ─────────────────────── */}
            {!done && step === 10 && (
              <div>
                <Label>
                  {answers.willingToPay === "probably_not" ? "Got it — last one anyway." : "Perfect."}
                </Label>
                <QTitle>What would feel like a fair monthly price?</QTitle>
                <p className="text-base text-brand-charcoal/50 font-medium mb-7">
                  Pick what feels right to you. This locks in our launch pricing direction.
                </p>
                <div className="flex flex-col gap-3 mb-7">
                  {PRICE_OPTIONS.map((o, i) => (
                    <OptionCard key={o.value} label={o.label} selected={answers.willingPrice === o.value}
                      onClick={() => setAnswers(a => ({ ...a, willingPrice: o.value }))}
                      shortcut={shortcuts[i]} />
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
                  <ActionBtn onClick={submit} label={submitting ? "Saving…" : "Submit"} disabled={submitting} green />
                  {!submitting && (
                    <button
                      type="button" onClick={submit}
                      className="text-sm font-semibold transition-colors hover:opacity-70"
                      style={{ color: "rgba(20,20,19,0.3)", cursor: "pointer", touchAction: "manipulation" }}
                    >
                      Skip and finish →
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Footer hint */}
      {!done && (
        <div className="shrink-0 pb-5 text-center">
          <span className="text-xs font-medium" style={{ color: "rgba(20,20,19,0.18)" }}>
            press <kbd className="font-mono">Enter ↵</kbd> to continue
          </span>
        </div>
      )}
    </div>
  );
}
