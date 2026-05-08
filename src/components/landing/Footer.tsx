import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#141413",
        borderTop: "3px solid #25D366",
      }}
      className="py-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{
                backgroundColor: "#25D366",
                border: "2px solid #25D366",
                borderRadius: "8px",
              }}
            >
              <Zap className="w-4 h-4 text-brand-charcoal fill-brand-charcoal" />
            </div>
            <span className="font-black text-white text-lg tracking-tight">
              Super<span style={{ color: "#25D366" }}>Status</span>
            </span>
          </div>

          {/* Links */}
          {/* <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/40 font-semibold">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#waitlist" className="hover:text-white transition-colors">Join waitlist</a>
            <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
          </div> */}

          {/* Copyright */}
          <p className="text-white/25 text-xs font-medium">
            © 2026 SuperStatus
          </p>
        </div>

        {/* Disclaimer */}
        {/* <p className="mt-8 text-white/20 text-[11px] text-center leading-relaxed max-w-2xl mx-auto font-medium">
          SuperStatus uses multi-device protocols to automate WhatsApp Status posts. WhatsApp&apos;s official Business API does not support Status posting. We recommend using a dedicated business number. SuperStatus is not affiliated with WhatsApp or Meta. Please review WhatsApp&apos;s Terms of Service before use.
        </p> */}
      </div>
    </footer>
  );
}
