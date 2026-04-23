import libraryExercise from "../imgs/muscular-man-deadlift.jpg";
import { Link } from "react-router-dom";
import Header from "./Header";
import Hr from "./Hr";
const BentoGrid = () => {
  return (
    <>
      {" "}
      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle="OUR"
          highlightTitle="TOOLS"
          body="Our Gym Guide is a specialized environment designed to bridge the gap between raw effort and scientific progression. We provide the tools; you provide the consistency."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Item 1: Exercise Library */}
          <Link
            className="md:col-span-2 relative overflow-hidden rounded-xl bg-surface-container group cursor-pointer border border-white/5"
            to="/library"
          >
            <img
              alt="Exercise Library"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              data-alt="Athletic person performing a heavy bench press in a moody high-end gym with cinematic lighting and deep shadows"
              src={libraryExercise}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 p-8 flex flex-col items-start gap-2 z-20">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-container">
                  fitness_center
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-primary-container font-bold">
                  Chest Day
                </span>
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight text-white">
                Exercise Library
              </h3>
            </div>
          </Link>

          {/* Item 2: Training Splits */}
          <Link
            to="/splits"
            className="rounded-xl glass-card p-8 flex flex-col justify-between group cursor-pointer 
            hover:border-primary-container/40 hover:shadow-[0_0_30px_-10px_rgba(0,112,255,0.2)] 
            transition-all duration-700 border border-white/5"
          >
            <div
              className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center 
             group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 "
            >
              <span className="material-symbols-outlined text-white">
                calendar_view_week
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Training Splits
              </h3>
              <p className="text-on-surface-variant text-sm mb-4">
                Optimized for rapid strength gains.
              </p>
              <div className="bg-background/50 p-3 rounded-lg border border-white/5">
                <span className="text-primary-container font-bold uppercase text-[10px] tracking-wider">
                  Recommended:
                </span>
                <p className="text-white font-bold text-sm">3-Day Full Body</p>
              </div>
            </div>
          </Link>

          {/* Item 3: AI Gym Partner */}
          <Link
            to="/aicoach"
            className="rounded-xl bg-surface-container-high p-8 flex flex-col justify-between 
          border border-primary-container/20 relative overflow-hidden cursor-pointer group 
          hover:border-primary-container/60 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 p-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-primary-container/10 text-8xl">
                forum
              </span>
            </div>

            <div className="z-10">
              <div className="inline-flex items-center gap-2 bg-primary-container/10 px-3 py-1 rounded-full mb-4">
                <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-widest text-primary-container font-black">
                  Online Now
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white leading-tight">
                AI Gym Partner
              </h3>
            </div>

            <div className="z-10 bg-background/60 backdrop-blur-md p-4 rounded-2xl flex items-start gap-3 border border-white/5">
              <span className="material-symbols-outlined text-primary-container text-xl">
                chat_bubble
              </span>

              <p className="text-sm text-on-surface italic text-zinc-300 font-light">
                "Got a question? Ask the Coach."
              </p>
            </div>
          </Link>

          {/* Item 4: Daily Tip */}
          <Link
            to="/tips"
            className=" md:col-span-2 rounded-xl bg-gradient-to-br from-surface-container to-background 
          p-8 flex flex-col md:flex-row items-center gap-8 border border-white/5 
          cursor-pointer group hover:from-surface-container-high transition-all duration-500"
          >
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold mb-4">
                Daily Tip
              </div>
              <h4 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white leading-none group-hover:tracking-tight transition-all duration-500">
                Consistency {">"}{" "}
                <span className="text-primary-container group-hover:brightness-125">
                  Intensity.
                </span>
              </h4>
            </div>
            <p className="flex-1 text-on-surface-variant text-sm leading-relaxed font-light">
              Showing up 4 times a week at 70% effort will always beat a single
              100% workout followed by 2 weeks of recovery. Focus on the habit
              first.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default BentoGrid;
