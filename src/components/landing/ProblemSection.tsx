import { CalendarX, BatteryLow, TrendingDown } from "lucide-react";

const painPoints = [
  {
    icon: CalendarX,
    accentColor: "#FFCB47",
    title: "You keep forgetting",
    body: "Monday becomes Tuesday. Tuesday becomes next week. Your network stops seeing you and the client goes to someone more visible.",
  },
  {
    icon: BatteryLow,
    accentColor: "#DCF8C6",
    title: "Consistency is exhausting",
    body: "Coming up with fresh content every day while juggling clients, deliverables, and life is simply not sustainable for most people.",
  },
  {
    icon: TrendingDown,
    accentColor: "#D97757",
    title: "One missed week kills momentum",
    body: "WhatsApp Status has a 24-hour clock. No second chances. If you're not showing up daily, you're invisible to your entire network.",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-white py-20 lg:py-28 border-b-2 border-brand-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Label */}
        {/* <div className="mb-8">
          <span className="section-label">✦ The Real Problem</span>
        </div> */}

        {/* Headline */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-charcoal leading-[1.05] tracking-tight">
            You know consistency
            <br />
            builds your brand.
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black leading-[1.05] tracking-tight mt-2">
            <span
              className="inline-block bg-brand-orange px-2 py-0.5 font-heading italic"
              style={{
                border: "2px solid #141413",
                boxShadow: "3px 3px 0px #141413",
                transform: "rotate(-1deg)",
                fontStyle: "italic",
                color: "#ffffff",
              }}
            >
              But life always wins.
            </span>
          </h3>
          <p className="mt-6 text-base sm:text-lg text-brand-charcoal/70 leading-relaxed font-medium">
            WhatsApp Status is the highest-ROI attention surface in Nigeria. Zero algorithm,
            zero cost, reaches your entire network daily. Yet most people fail at it for one
            reason: they're human.
          </p>
        </div>

        {/* Pain point cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {painPoints.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="card-brutal p-6">
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5 shrink-0"
                  style={{
                    backgroundColor: p.accentColor,
                    border: "2px solid #141413",
                    borderRadius: "10px",
                    boxShadow: "3px 3px 0px #141413",
                  }}
                >
                  <Icon className="w-5 h-5 text-brand-charcoal" strokeWidth={2.5} />
                </div>
                <h4 className="font-black text-brand-charcoal text-lg mb-2">{p.title}</h4>
                <p className="text-brand-charcoal/60 text-sm leading-relaxed font-medium">{p.body}</p>
              </div>
            );
          })}
        </div>

        {/* Stat callout — neo-brutal box */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left p-5 sm:p-8"
          style={{
            backgroundColor: "#FAF9F5",
            border: "3px solid #141413",
            borderRadius: "16px",
            boxShadow: "6px 6px 0px #141413",
          }}
        >
          <div className="shrink-0">
            <div
              className="inline-block px-4 py-2"
              style={{
                backgroundColor: "#FFCB47",
                border: "2px solid #141413",
                borderRadius: "8px",
                boxShadow: "3px 3px 0px #141413",
              }}
            >
              <p className="text-4xl sm:text-5xl font-black text-brand-charcoal leading-none">73%</p>
            </div>
            <p className="text-brand-gray text-xs font-semibold mt-2">of creators surveyed</p>
          </div>
          <div
            className="hidden sm:block w-px self-stretch"
            style={{ backgroundColor: "#E8E6DC" }}
          />
          <p className="text-brand-charcoal text-base sm:text-lg leading-relaxed font-medium">
            want to post consistently on WhatsApp Status but{" "}
            <strong className="text-brand-charcoal font-black underline decoration-brand-green decoration-2 underline-offset-2">
              can't stay consistent for more than two weeks.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
