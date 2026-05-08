"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The SuperStatus brand mark.
 *
 * Visual concept: a 270° arc (WhatsApp Status ring) with a lightning bolt
 * breaking through the gap — "your status, supercharged."
 * Contained in a WhatsApp-green rounded-square app icon.
 */
function LogoMark({ size = 38 }: { size?: number }) {
  const pad = Math.round(size * 0.25);
  const inner = size - pad;

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#25D366",
        border: "2.5px solid #141413",
        borderRadius: Math.round(size * 0.275) + "px",
        boxShadow: "2px 2px 0px #141413",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
    >
      {/*
       * viewBox 22×22 — tight canvas for a clean mark.
       * Arc: circle center (11,11) radius 7, sweeps 270° from top (11,4)
       *      clockwise to right (18,11), leaving gap at top-right.
       * Lightning: fills the gap at top-right, reads as charging energy.
       */}
      <svg width={inner} height={inner} viewBox="0 0 22 22" fill="none">
        {/* Status ring arc — 270° clockwise, gap at top-right */}
        <path
          d="M11 4A7 7 0 1 1 18 11"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Lightning bolt in the gap */}
        <path
          d="M19 2L13 12H17L13 20L23 9H19L19 2Z"
          fill="#FFCB47"
        />
      </svg>
    </div>
  );
}

function Wordmark() {
  return (
    <span
      className="text-[1.2rem] tracking-tight select-none"
      style={{ fontWeight: 900, letterSpacing: "-0.02em" }}
    >
      <span style={{ color: "#141413" }}>Super</span>
      <span style={{ color: "#25D366" }}>Status</span>
    </span>
  );
}

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

/* ── Reusable brutal button component ──────────────────────────── */
function BrutalBtn({
  href,
  bg,
  textColor = "#141413",
  shadowColor = "#141413",
  children,
  onClick,
  fullWidth = false,
}: {
  href: string;
  bg: string;
  textColor?: string;
  shadowColor?: string;
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5",
        "font-black text-sm rounded-lg px-5 py-2.5",
        "transition-all duration-100",
        "hover:-translate-x-px hover:-translate-y-px",
        "active:translate-x-px active:translate-y-px",
        fullWidth && "w-full"
      )}
      style={{
        backgroundColor: bg,
        color: textColor,
        border: "2px solid #141413",
        boxShadow: `3px 3px 0px ${shadowColor}`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${shadowColor}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${shadowColor}`;
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${shadowColor}`;
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${shadowColor}`;
      }}
    >
      {children}
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-brand-cream/95 backdrop-blur-sm border-b-2 border-brand-charcoal"
          : "bg-transparent border-b-2 border-transparent"
      )}
    >
      {/* ── Main bar ───────────────────────────────────────────── */}
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 h-[72px] flex items-center justify-between gap-8">

        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group shrink-0"
          onClick={() => setMobileOpen(false)}
        >
          <div className="group-hover:-translate-y-0.5 group-hover:shadow-hard transition-all duration-150">
            <LogoMark size={38} />
          </div>
          <Wordmark />
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={cn(
                "text-sm font-semibold text-brand-charcoal/70",
                "hover:text-brand-charcoal",
                "hover:underline underline-offset-4 decoration-brand-green decoration-2",
                "transition-colors duration-150"
              )}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop button duet */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Log in — warm yellow: lower-commitment action */}
          {/* <BrutalBtn href="#" bg="#FFCB47" textColor="#141413">
            Log in
          </BrutalBtn> */}
          {/* Get early access — orange: primary acquisition CTA */}
          <BrutalBtn href="#waitlist" bg="#D97757" textColor="#ffffff">
            Get early access
            <ArrowRight className="w-3.5 h-3.5" />
          </BrutalBtn>
        </div>

        {/* Mobile hamburger — yellow when closed, charcoal when open */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="lg:hidden transition-all duration-200"
          style={{
            backgroundColor: mobileOpen ? "#141413" : "#FFCB47",
            border: "2px solid #141413",
            borderRadius: "9px",
            boxShadow: mobileOpen ? "2px 2px 0px #FFCB47" : "2px 2px 0px #141413",
            padding: "9px",
          }}
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFCB47" strokeWidth="3" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#141413" strokeWidth="3" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile menu ──────────────────────────────────────────
          Design intent: a premium "ticket" that drops from the nav.
          Warm yellow-bg background = inviting, off-the-page surprise.
          Extra-large nav links = thumb-friendly, confident, readable.
          Two-tone button duet mirrors desktop — brand consistency.
          Branded footer tag = a small detail that signals craft.
      ──────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
        style={{
          backgroundColor: "#FFF8E7",
          borderBottom: mobileOpen ? "3px solid #141413" : "none",
        }}
        aria-hidden={!mobileOpen}
      >
        {/* Nav link rows — oversized for impact and touch ease */}
        <div>
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center justify-between",
                "px-6 sm:px-10 py-5",
                "font-black text-2xl text-brand-charcoal",
                "transition-colors hover:bg-brand-yellow/30",
                "group"
              )}
              style={{
                borderBottom: i < NAV_LINKS.length - 1 ? "2px solid #E8E6DC" : "none",
              }}
            >
              {l.label}
              <ArrowRight
                className="w-5 h-5 text-brand-charcoal/30 group-hover:text-brand-charcoal group-hover:translate-x-1 transition-all"
              />
            </a>
          ))}
        </div>

        {/* Thick divider before buttons */}
        <div style={{ height: "2px", backgroundColor: "#141413" }} />

        {/* Two-tone button row */}
        <div className="px-6 sm:px-10 py-5 flex gap-3">
          {/* <BrutalBtn
            href="#"
            bg="#FFCB47"
            textColor="#141413"
            onClick={() => setMobileOpen(false)}
            fullWidth
            
          >
            Log in
          </BrutalBtn> */}
          <BrutalBtn
            href="#waitlist"
            bg="#D97757"
            textColor="#ffffff"
            onClick={() => setMobileOpen(false)}
            fullWidth
          >
            Get access →
          </BrutalBtn>
        </div>

        {/* Branded footer marker — small craft detail */}
        <div
          className="flex items-center justify-center gap-2 py-3"
          style={{ borderTop: "2px solid #E8E6DC" }}
        >
          <LogoMark size={20} />
          <span className="text-[11px] font-black text-brand-charcoal/40 uppercase tracking-widest">
            SuperStatus
          </span>
        </div>
      </div>
    </header>
  );
}
