import {
  CalendarClock,
  PenLine,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: CalendarClock,
    title: "Never miss a day again",
    body: "Set your rhythm — Mon/Wed/Fri at 9am and forget it. Your status goes up on time, every time, even when your phone is off and you're swamped.",
    iconBg: "#DCF8C6",
    rotate: "-2deg",
  },
  {
    icon: PenLine,
    title: "Posts that sound like you",
    body: "Your niche, your tone, your goal. Every post is written to match how you actually talk not robotic, not generic. Your audience won't know it's automated.",
    iconBg: "#FFCB47",
    rotate: "1.5deg",
  },
  {
    icon: Smartphone,
    title: "Works while your phone is off",
    body: "Scan once. Our cloud device takes over and runs 24/7. Your phone can be dead, in your bag, or in another city. SuperStatus never stops.",
    iconBg: "#E0F0FF",
    rotate: "-1deg",
  },
  {
    icon: ShieldCheck,
    title: "Your account stays safe",
    body: "We built smart pacing and warm-up sequences from day one. Your WhatsApp number is the most important thing here, we treat it that way.",
    iconBg: "#FFE4E4",
    rotate: "2deg",
  },
];

export function BenefitsSection() {
  return (
    <section
      id="features"
      className="py-20 lg:py-28 border-b-2 border-brand-charcoal"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Label */}
        {/* <div className="mb-8">
          <span className="section-label">✦ What you get</span>
        </div> */}

        {/* Headline */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-charcoal leading-[1.05] tracking-tight">
            Show up every single day.
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black leading-[1.05] tracking-tight mt-1">
            <span className="text-brand-charcoal/45">Without the mental load.</span>
          </h3>
          <p className="mt-5 text-brand-charcoal/60 text-base sm:text-lg font-medium leading-relaxed">
            Everything built for Phase 1 is focused on one thing: keeping you visible to your network, consistently, without it costing you hours.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="card-brutal-cream flex flex-col gap-4 p-6"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    backgroundColor: f.iconBg,
                    border: "2px solid #141413",
                    borderRadius: "10px",
                    boxShadow: "2px 2px 0px #141413",
                  }}
                >
                  <Icon className="w-5 h-5 text-brand-charcoal" />
                </div>
                <div>
                  <h3 className="font-black text-brand-charcoal text-base mb-1.5">{f.title}</h3>
                  <p className="text-brand-charcoal/60 text-sm leading-relaxed font-medium">{f.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
