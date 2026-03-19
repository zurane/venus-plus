import { useRef } from "react";
import logo from "../assets/venus_logo.svg";
import backgroundImg from "../assets/eng-web-28-09-2025.jpg";
import { PiDotsNineBold, PiCaretRightBold } from "react-icons/pi";

const floatingCards = [
  { id: 1, icon: "🎬", name: "Netflix", sub: "Renews in 2 days", amount: "R 22.99", alert: true, position: "top-[22%] left-[5%]", delay: "0s" },
  { id: 2, icon: "✅", name: "Cancelled", sub: "Saved R 144/yr", amount: "+R 144", positive: true, position: "top-[20%] right-[5%]", delay: "2s" },
  { id: 3, icon: "📊", name: "Monthly spend", sub: "5 active subs", amount: "R 67.95", position: "bottom-[28%] left-[6%]", delay: "4s" },
];

const stats = [
  { number: "R284", label: "avg. saved / year" },
  { number: "40k+", label: "active users" },
  { number: "2 min", label: "to set up" },
];


export default function Landing() {
 
  return (
    <div className="min-h-screen custom-bg overflow-x-hidden">

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blobDrift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(24px,-24px) scale(1.06); }
        }
        .float-card  { animation: floatY 6s ease-in-out infinite; }
        .strip-track { animation: scrollLeft 30s linear infinite; }
        .strip-track:hover { animation-play-state: paused; }
        .fade-up-1 { animation: fadeUp 0.7s 0.00s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.12s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.22s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.32s ease both; }
        .fade-up-5 { animation: fadeUp 0.7s 0.42s ease both; }
        .blob-1 { animation: blobDrift  9s ease-in-out    infinite; }
        .blob-2 { animation: blobDrift 11s ease-in-out 3s infinite; }
        .poster-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .poster-card:hover { transform: translateY(-8px) scale(1.05); box-shadow: 0 16px 40px rgba(0,0,0,0.5); z-index: 10; }
        .cta-btn { transition: transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.25s ease; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(9,90,230,0.45); }
        .sign-in-btn { transition: background 0.2s, color 0.2s, border-color 0.2s; }
        .sign-in-btn:hover { background: white; color: #0a0a0f; border-color: white; }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5
                        ">
        <img src={logo} alt="Venus+" width={160} />
        <div className="flex items-center gap-6">
          <PiDotsNineBold size={22} className="text-white/40 cursor-pointer hover:text-white transition-colors" />
          <button
            onClick={() => window.location.href = '/sign-in'}
            className="sign-in-btn rounded-full border border-white/25 px-7 py-2 text-sm
                       font-semibold text-white font-BeVietnam tracking-tight"
          >
            Sign in
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6 overflow-hidden">

        
        <div className="absolute inset-0 pointer-events-none"
          
        />

       
        <div className="absolute inset-0 pointer-events-none gradient-texture-bg" />


        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,10,15,0.9) 100%)" }}
        />


        <div className="blob-1 absolute w-[560px] h-[560px] rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle,#2e5bff,#0a0a0f)", top: -140, left: -140, filter: "blur(100px)" }} />
        <div className="blob-2 absolute w-[420px] h-[420px] rounded-full pointer-events-none opacity-15"
          style={{ background: "radial-gradient(circle,#6d28d9,#0a0a0f)", bottom: -80, right: -80, filter: "blur(90px)" }} />

        {/* Floating cards */}
        {floatingCards.map((card) => (
          <div key={card.id}
            className={`float-card absolute hidden lg:flex items-center gap-3
                        bg-[#13131a] rounded-2xl px-4 py-3
                        border border-white/[0.08]
                        shadow-[0_4px_32px_rgba(0,0,0,0.4)] min-w-[190px] ${card.position}`}
            style={{ animationDelay: card.delay }}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 relative
              ${card.alert ? "bg-red-950/60" : card.positive ? "bg-green-950/60" : "bg-blue-950/60"}`}>
              {card.icon}
              {card.alert && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500
                                 border-2 border-[#13131a] text-[8px] text-white font-bold flex items-center justify-center">!</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white leading-tight font-BeVietnam">{card.name}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{card.sub}</p>
            </div>
            <span className={`text-[13px] font-bold font-BeVietnam ${card.positive ? "text-green-400" : "text-white"}`}>
              {card.amount}
            </span>
          </div>
        ))}

        {/* Hero copy */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">

          {/* Badge */}
          <div className="fade-up-1 inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10]
                          rounded-full px-3 py-1.5 mb-9">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-blue-400 block" />
            </span>
            <span className="text-[12.5px] font-medium text-white/50 font-BeVietnam">
              Trusted by 40,000+ subscribers
            </span>
          </div>

          {/* Headline */}
          <h1 className="fade-up-2 font-BeVietnam font-extrabold text-white
                         tracking-tight text-3xl sm:text-4xl lg:text-6xl mb-6">
            Every Subscription. <br/>One Place. Zero Surprises.

          </h1>

          {/* Subtitle */}
          <p className="fade-up-3 font-BeVietnam text-white/50 text-lg font-light leading-relaxed max-w-md mb-10">
            Track every streaming sub, get renewal alerts before they hit,
            and cut what you don't use.
          </p>

          {/* CTAs */}
          <div className="fade-up-4 flex items-center gap-4">
            <button
              onClick={() => window.location.href = '/sign-up'}
              className="cta-btn flex items-center gap-3 rounded-full
                         bg-gradient-to-r from-[#095ae6] to-[#062794]
                         shadow-[0_4px_20px_rgba(9,90,230,0.3)]
                         px-8 py-3.5 font-BeVietnam font-bold text-white text-[15px]"
            >
              Start Tracking Free
              <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                <PiCaretRightBold size={11} />
              </span>
            </button>
            <button
              onClick={() => window.location.href = '#how-it-works'}
              className="font-BeVietnam text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1.5"
            >
              See how it works <PiCaretRightBold size={12} />
            </button>
          </div>

          {/* Stats */}
          <div className="fade-up-5 flex items-center gap-10 mt-16">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-10">
                <div className="text-center">
                  <p className="font-BeVietnam font-extrabold text-white text-3xl leading-none tracking-tight mb-1">
                    {s.number}
                  </p>
                  <p className="text-[12px] text-white/35 font-BeVietnam">{s.label}</p>
                </div>
                {i < stats.length - 1 && <div className="w-px h-9 bg-white/10" />}
              </div>
            ))}
          </div>
        </div>


      </header>
    </div>
  );
}