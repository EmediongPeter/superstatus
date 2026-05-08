import { WaitlistForm } from "./WaitlistForm";

const perks = [
  "Direct line to the founder on WhatsApp",
  "Lifetime deal, locked before public pricing",
  "Priority onboarding with 1-on-1 setup call",
  "First access to every new feature",
];

export function WaitlistCTA() {
  return (
    <section
      id="pricing"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: "#141413" }}
    >
      {/* Background geo decorators */}
      <div
        className="absolute top-10 right-10 w-20 h-20 rotate-12 hidden lg:block"
        style={{
          backgroundColor: "#25D366",
          border: "2px solid #25D366",
          borderRadius: "8px",
          opacity: 0.15,
        }}
      />
      <div
        className="absolute bottom-10 left-10 w-14 h-14 -rotate-6 hidden lg:block"
        style={{
          backgroundColor: "#FFCB47",
          border: "2px solid #FFCB47",
          borderRadius: "50%",
          opacity: 0.12,
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center" id="waitlist">

        {/* Label badge */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 text-xs font-black px-4 py-2"
            style={{
              backgroundColor: "#FFCB47",
              border: "2px solid #FFCB47",
              borderRadius: "9999px",
              boxShadow: "3px 3px 0px #FFCB47",
              color: "#141413",
            }}
          >
            500 spots · early access
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
          Every day you go quiet,
          <br />
          <span
            className="inline-block font-heading italic px-3 py-1 mt-2 lg:text-[56px]"
            style={{
              fontStyle: "italic",
              backgroundColor: "#25D366",
              border: "2px solid #25D366",
              borderRadius: "8px",
              boxShadow: "4px 4px 0px #25D366",
              color: "#141413",
            }}
          >
            someone else gets the client.
          </span>
        </h2>

        <p className="text-white/50 text-base sm:text-lg mb-10 leading-relaxed font-medium">
          Join 147 creators who decided to stop disappearing.
          Get in before public pricing — no credit card required.
        </p>

        {/* Form card */}
        <div
          className="max-w-lg mx-auto mb-10 p-6 text-left"
          style={{
            backgroundColor: "#FAF9F5",
            border: "2px solid #25D366",
            borderRadius: "16px",
            boxShadow: "6px 6px 0px #25D366",
          }}
        >
          <WaitlistForm variant="dark" placeholder="your@email.com" />
        </div>

        {/* Perks */}
        <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-6 gap-y-3">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm text-white/50 font-medium">
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[9px] font-black"
                style={{ backgroundColor: "#25D366", color: "#141413" }}
              >
                ✓
              </span>
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
