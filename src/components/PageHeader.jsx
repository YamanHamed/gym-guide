import React from "react";

const PageHeader = () => {
  return (
    <header className="min-h-[50vh] flex flex-col justify-center mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        {/* Left Side: Main Title */}
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase leading-[0.9]">
            EXERCISES <br />
            <span className="text-primary-container italic transition-all duration-500 ">
              LIBRARY
            </span>
          </h1>
        </div>

        {/* Right Side: Sub-text & Context */}
        <div className="md:text-right pb-2 max-w-sm md:ml-auto">
          <div className="flex items-center md:justify-end gap-2 mb-4 opacity-40">
            <div className="w-8 h-[1px] bg-white"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Vault 02
            </span>
          </div>

          <p className="text-white text-xl md:text-2xl font-black italic tracking-tighter uppercase mb-3 leading-tight">
            Build your physique smartly
          </p>

          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold leading-relaxed">
            Scientific progression starts with technical mastery. Select a
            target area to initialize protocols.
          </p>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
