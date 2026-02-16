import logo from "../assets/venus_logo.svg";
import backgroundImg from "../assets/eng-web-28-09-2025.jpg";
import { PiDotsNineBold, PiCaretRightBold } from "react-icons/pi";

export default function Landing() {

  return (
    <div>
      <header
        style={{
          // Fixed: Removed comments and changed colors to rgba for transparency
          backgroundImage: `radial-gradient(125% 125% at 50% 100%, rgba(0, 0, 0, 0.7) 100%, rgba(1, 1, 51, 0.9) 100%), url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
        className="h-screen py-5 px-28 relative"
      >
        <nav className="flex flex-row items-center justify-between">
          <div>
            {/* logo */}
            <img src={logo} className="App-logo" width={200} alt="logo" />
          </div>
          <div className="flex flex-row items-center gap-5">
            <PiDotsNineBold color="white" size={32} />
            <button onClick={() => window.location.href = '/sign-in'} className="rounded-full border px-10 py-2 font-BeVietnam font-bold text-white my-3">
              Sign in
            </button>
          </div>
        </nav>
        <div className="absolute bottom-32">
          <h1 className="text-white font-BeVietnam w-3/4 leading-snug text-4xl font-extrabold mb-5">
            Never Pay for a Forgotten Subscription Again.
          </h1>
          <button onClick={() => window.location.href = '/sign-up'} className="flex items-center gap-3 rounded-full shadow-md inset-shadow-sm shadow-blue-500/20 bg-gradient-to-r from-[#095ae6] to-[#062794] px-9 py-3 font-BeVietnam font-bold text-white my-3">
            Start Tracking Free
            <PiCaretRightBold />
          </button>
        </div>
      </header>
    </div>
  );
}
