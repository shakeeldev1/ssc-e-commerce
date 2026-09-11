import { Link } from 'react-router-dom';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export const SmartCardIntro = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#030712] py-20 text-white selection:bg-[#E2A746] selection:text-black">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column: Corrected 3D Perspective Card */}
          <div className="flex justify-center lg:col-span-6 [perspective:1200px]">
            <div 
              className="relative w-full max-w-[440px] aspect-[1.58/1] rounded-2xl border border-slate-400/25 bg-[#121c27] p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-500 hover:[transform:rotateY(10deg)_rotateX(6deg)_rotateZ(1deg)_scale(1.02)] [transform-style:preserve-3d] [transform:rotateY(16deg)_rotateX(8deg)_rotateZ(2deg)]"
            >
              {/* Top Curved Glass Reflection Overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent opacity-90" />
              
              {/* Subtle Inner Mesh Wave Background */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-700/20 via-transparent to-transparent" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                
                {/* Header: Title Left, Brand Logo Right */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold tracking-wider text-slate-100">
                      SSC STORE
                    </h3>
                    <p className="text-[10px] font-semibold tracking-wider text-slate-400">
                      MEMBERSHIP CARD
                    </p>
                  </div>

                  {/* Top-Right Logo Graphic */}
                  <div className="flex flex-col items-end">
                    <div className="flex gap-1 text-[#E2A746]">
                      <div className="h-2 w-2 rounded-sm bg-[#E2A746]" />
                      <div className="h-2 w-2 rounded-sm bg-[#E2A746]" />
                    </div>
                    <span className="text-[7px] font-bold tracking-tight text-slate-400 mt-0.5">
                      PA PAK
                    </span>
                  </div>
                </div>

                {/* Middle Content Section */}
                <div className="my-auto flex items-center justify-between pt-2">
                  {/* Left Side: Avatar Photo + Security Icon */}
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-14 overflow-hidden rounded-lg border border-slate-400/40 bg-slate-800 shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                        alt="Member Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-400">
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Right Side: QR Code Box */}
                  <div className="rounded-lg bg-white p-1.5 shadow-lg border border-slate-200">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SSCSTORE-VERIFIED"
                      alt="QR Code"
                      className="h-16 w-16"
                    />
                  </div>
                </div>

                {/* Member ID Line */}
                <div className="text-xs font-semibold tracking-wider text-slate-300">
                  MEMBER ID: <span className="font-mono text-sm font-bold text-white">123456 7800</span>
                </div>

                {/* Card Footer Section */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] italic text-slate-400">
                    Your Loyalty, Our Priority
                  </span>
                  <span className="rounded bg-emerald-500/90 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-black shadow-sm">
                    VERIFIED
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Text & Buttons */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2A746]">
              SPECIAL OFFER
            </span>

            <h2 className="mt-2 font-serif text-4xl font-semibold leading-tight text-white lg:text-5xl">
              One Card. Verified.<br />
              Endless Savings.
            </h2>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
              Be a part of SSCStore membership program and unlock exclusive deals, discounts and rewards.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/smart-card"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F7C97F] px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-[#ffe1a8] hover:shadow-lg hover:shadow-[#F7C97F]/20"
              >
                <span>Become a Member</span>
                <ArrowRightIcon />
              </Link>

              <Link
                to="/student-benefits"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-transparent px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-900"
              >
                Learn More
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};