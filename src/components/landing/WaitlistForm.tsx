"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { OnboardingModal } from "./OnboardingModal";

type Status = "idle" | "loading" | "onboarding" | "success" | "error" | "duplicate";

interface WaitlistFormProps {
  variant?: "light" | "dark";
  placeholder?: string;
}

export function WaitlistForm({
  variant = "light",
  placeholder = "Enter your email address",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setSubmittedEmail(email);
    setEmail("");
    setStatus("onboarding");
  }

  if (status === "success") {
    const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(submittedEmail)}`;

    return (
      <div
        className="flex items-center gap-4 px-5 py-4"
        style={{
          backgroundColor: "#DCF8C6",
          border: "2px solid #141413",
          borderRadius: "12px",
          boxShadow: "4px 4px 0px #141413",
        }}
      >
        <div
          className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-white relative"
          style={{ border: "2px solid #141413" }}
        >
          <Image
            src={avatarUrl}
            alt="Your avatar"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-black text-brand-green-dark text-sm leading-tight">You&apos;re in!</p>
          <p className="text-brand-green-dark/70 text-xs mt-1 leading-snug">
            We&apos;ll reach out to {submittedEmail} when early access opens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {status === "onboarding" && (
        <OnboardingModal
          email={submittedEmail}
          onDone={() => setStatus("success")}
        />
      )}

      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder={placeholder}
            required
            className="flex-1 px-4 py-3.5 text-sm font-semibold input-brutal bg-white text-brand-charcoal placeholder:text-brand-gray"
          />
          <button
            type="submit"
            disabled={!email}
            className="btn-brutal-primary flex items-center justify-center gap-2 px-6 py-3.5 text-sm shrink-0 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:bg-brand-orange-dark transition-colors"
          >
            Get early access
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {(status === "error" || status === "duplicate") && (
          <p
            className={`mt-2 text-xs font-semibold px-1 ${
              status === "duplicate" ? "text-brand-green-dark" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </>
  );
}
