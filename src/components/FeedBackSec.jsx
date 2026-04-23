import React from "react";
import Header from "./Header";
import Hr from "./Hr";

const FeedBackSec = () => {
  return (
    <>
      {/* Transition Divider */}
      <Hr />

      <section className="max-w-7xl mx-auto py-24">
        {/* Header Section */}
        <Header
          className="mb-16"
          plainTitle="SYSTEM"
          highlightTitle="FEEDBACK"
          body="Found a bug in the protocol or have a suggestion for the AI Coach? Send a direct uplink to the developer to help refine the experience."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Connection Status */}
          <div className="hidden md:flex md:col-span-1 flex-col justify-between p-8 rounded-[2rem] bg-surface-container-low/30 border border-white/5">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#0070FF] animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/50">
                  Uplink Status: Active
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed italic">
                "Your feedback is the data that drives our progression. Every
                report is reviewed for system optimization."
              </p>
            </div>

            <div className="mt-12 opacity-20">
              <span className="material-symbols-outlined text-6xl text-white">
                sensors
              </span>
            </div>
          </div>
          {/* Right Columns: The Form Area */}
          <div className="col-span-1 md:col-span-2 p-8 md:p-12 rounded-[2rem] bg-surface-container-low/30 border border-white/5">
            {/* Form Title */}
            <div className="mb-8">
              <h3 className="text-white text-xl font-bold italic tracking-tight uppercase">
                contact us
                {/* <span className="text-[#0070FF]"></span> */}
              </h3>
              <div className="h-0.5 w-12 bg-[#0070FF] mt-2"></div>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder=" NAME"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-[10px] font-bold tracking-widest outline-none focus:border-[#0070FF]/50 transition-all placeholder:text-zinc-700"
                />
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-[10px] font-bold tracking-widest outline-none focus:border-[#0070FF]/50 transition-all placeholder:text-zinc-700"
                />
              </div>

              <textarea
                rows="5"
                placeholder="TYPE YOUR MESSAGE HERE..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-[10px] font-bold tracking-widest outline-none focus:border-[#0070FF]/50 transition-all placeholder:text-zinc-700 resize-none"
              ></textarea>

              {/* Primary Colored Submit Button */}
              <button className="group relative w-full py-5 bg-[#0070FF] hover:bg-[#005ed4] rounded-xl overflow-hidden transition-all shadow-[0_0_20px_-5px_rgba(0,112,255,0.4)] active:scale-[0.98]">
                <span className="relative text-[11px] font-black uppercase tracking-[0.4em] text-white flex items-center justify-center gap-3">
                  submit
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    north_east
                  </span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeedBackSec;
