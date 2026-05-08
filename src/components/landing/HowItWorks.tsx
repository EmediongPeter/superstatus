import { ScanQrCode, Target, MessageCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ScanQrCode,
    title: "Scan QR once",
    quote: "Your phone stays in your pocket. Forever.",
    body: "Connect your WhatsApp in 60 seconds. Our cloud-hosted companion device takes over. Your phone can be off, dead, or in another city. It does not matter.",
    bg: "#FFF8E7",
    iconBg: "#FFCB47",
    stepBg: "#141413",
    stepText: "#FFCB47",
  },
  {
    number: "02",
    icon: Target,
    title: "Set your goal",
    quote: "\"Get 3 web-dev clients this month\"",
    body: "Tell SuperStatus what winning looks like for you, more clients, more DMs, more visibility. Every post from that point works toward it. Quietly. On your behalf.",
    bg: "#DCF8C6",
    iconBg: "#25D366",
    stepBg: "#25D366",
    stepText: "#141413",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Wake up to DMs",
    quote: "While you slept. While you worked. While you lived.",
    body: "Your status goes up every day in your voice, toward your goal. Your network sees you consistently. Clients reach out. You close the deals.",
    bg: "#FAF9F5",
    iconBg: "#D97757",
    stepBg: "#D97757",
    stepText: "#ffffff",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 relative border-b-2 border-brand-charcoal"
      style={{ backgroundColor: "#FAF9F5" }}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.035] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Label */}
        <div className="mb-8">
          <span className="section-label">✦ How it works</span>
        </div>

        {/* Headline */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-charcoal leading-[1.05] tracking-tight">
            From zero to{" "}
            <span className="highlight-green">consistent</span>
            {" "}in 3 steps.
          </h2>
          <p className="mt-5 text-brand-charcoal/60 text-base sm:text-lg font-medium leading-relaxed">
            No technical setup. No ongoing effort. Set it once and let the AI do its job.
          </p>
        </div>

        {/* Step cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col gap-5 p-7"
                style={{
                  backgroundColor: step.bg,
                  border: "2px solid #141413",
                  borderRadius: "16px",
                  boxShadow: "5px 5px 0px #141413",
                }}
              >
                {/* Step number tag */}
                <div
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center font-black text-sm"
                  style={{
                    backgroundColor: step.stepBg,
                    color: step.stepText,
                    border: "2px solid #141413",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 0px #141413",
                  }}
                >
                  {i + 1}
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center"
                  style={{
                    backgroundColor: step.iconBg,
                    border: "2px solid #141413",
                    borderRadius: "12px",
                    boxShadow: "3px 3px 0px #141413",
                  }}
                >
                  <Icon className="w-6 h-6 text-brand-charcoal" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-black text-brand-charcoal mb-1">{step.title}</h3>
                  <p className="text-brand-green-dark text-sm font-black mb-3 font-mono">
                    {step.quote}
                  </p>
                  <p className="text-brand-charcoal/65 text-sm leading-relaxed font-medium">
                    {step.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust callout */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 px-6 py-4 w-fit"
          style={{
            backgroundColor: "#ffffff",
            border: "2px solid #141413",
            borderRadius: "12px",
            boxShadow: "4px 4px 0px #141413",
          }}
        >
          <div
            className="w-7 h-7 flex items-center justify-center shrink-0 text-xs font-black"
            style={{ backgroundColor: "#DCF8C6", border: "2px solid #141413", borderRadius: "6px" }}
          >
            ✓
          </div>
          <div>
            <p className="text-brand-charcoal text-sm font-black">You stay in control.</p>
            <p className="text-brand-charcoal/55 text-sm font-medium">
              For your first 30 days, you approve every post before it goes live. After that, choose your level always manual, always automatic, or anything in between.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
