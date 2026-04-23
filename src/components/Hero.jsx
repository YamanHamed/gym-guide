import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full py-16 md:py-32 flex flex-col items-start overflow-hidden">
      <div className="w-full">
        {/* Heading: Using tracking-tighter for that high-end editorial look */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white max-w-5xl">
          Master the Gym.
          <br />
          <span className="text-[#0070FF] italic">No Guesswork.</span>
        </h1>

        {/* Content Wrapper: Using md:items-center for better visual balance */}
        <div className="mt-10 md:mt-16 flex flex-col md:flex-row md:items-center justify-between gap-10 w-full">
          <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">
            A structured foundation for beginners. Learn form, follow a plan,
            and ask our AI coach anything.
          </p>

          {/* Button: Added whitespace-nowrap to prevent label breaking */}
          <button
            onClick={() => navigate("/Library")}
            className="w-full md:w-auto whitespace-nowrap bg-[#0070FF] text-white px-10 py-5 rounded-full font-bold text-sm md:text-lg uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(0,112,255,0.4)] shrink-0"
          >
            Browse Library
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
