import React, { useEffect, useRef } from "react";
import cover from "../../imgs/gym-cover-03.webp";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Hr from "../../components/Hr";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchSplits } from "../../store/slices/splitsSlice";
import SkeletonCard from "../../components/SkeletonCard";
import ErrorTag from "../../components/ErrorTag";
import QuickLink from "../../components/QuickLink";

const Splits = () => {
  // == GENERAL ==
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.splits);
  const splitsRef = useRef(null);

  // == FECTH SPLITS ==
  useEffect(() => {
    if (status === "idle") dispatch(fetchSplits());
  }, [status, dispatch]);

  // == HANDLERS ==
  const handleCardClick = (split) => {
    navigate(`/splits/${split.name}`, { state: { split } });
  };

  return (
    <div>
      <Header
        // className="mb-16"
        pageHeader={true}
        plainTitle="TRAINING"
        highlightTitle="SPLITS"
        subTitle="Optimize Every Rep"
        body="Scientific progression starts with technical mastery. Select a target area to initialize protocols."
        image={cover}
        titleSize="text-5xl md:text-7xl"
        bodyClassName="max-w-[280px]"
      />
      <QuickLink
        className="mb-0 sm:mb-16 mt-8 sm:mt-10 "
        label="jump to splits"
        targetRef={splitsRef}
      />

      <section className="mb-32 ">
        <Header
          className="mb-16"
          plainTitle="THEORY &"
          highlightTitle="SYNERGY"
          subTitle="One Goal, Multiple Paths"
          body="Hypertrophy is a result of total weekly volume. Whether you hit a muscle once, twice, or three times a week, the physiological destination is the same."
        />
        <SplitCreationSection />
      </section>

      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle="SELECT YOUR"
          highlightTitle="SPLIT"
          subTitle="Deployment Options"
          body="Choose a framework that matches your weekly availability. Each protocol is optimized for a specific recovery-to-stimulus ratio."
        />
        <div className=" m-0" ref={splitsRef} />
        {status === "failed" && <ErrorTag error={error} />}
        {status === "loading" && (
          <div className="flex flex-col gap-12">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        )}
        {status === "succeeded" && (
          <div className="flex flex-col gap-12">
            {list.map((split) => (
              <Card
                type="side-image"
                reverse={true}
                key={split._id}
                title={split.name}
                links={split.links}
                body={split.description}
                image={split.image}
                onClick={() => handleCardClick(split)}
                rounded="rounded-2xl"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Splits;

const SplitCard = ({ split }) => {
  return (
    <article className="group relative w-full min-h-[400px] bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-[#0070FF]/30">
      {/* 1. Visual Anchor (Left Side) */}
      <div className="relative w-full md:w-3/5 overflow-hidden h-64 md:h-auto">
        <img
          src={split.img}
          className="w-full h-full object-cover grayscale opacity-40 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-60"
          alt={split.title}
        />
        {/* Subtle Side-Gradient to blend image into the info box */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A] hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent md:hidden" />
      </div>

      {/* 2. Command Center (Right Side) */}
      <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center relative z-10">
        {/* Meta Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0070FF] animate-pulse" />
          <span className="notranslate text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase">
            {split.id} // ACTIVE_PROTOCOL
          </span>
        </div>

        {/* Title & Description */}
        <h2 className="text-4xl md:text-5xl font-black italic text-white mb-4 tracking-tighter leading-none uppercase">
          {split.title}
        </h2>

        <p className="text-zinc-500 text-sm italic leading-relaxed mb-8 max-w-md">
          {split.description ||
            "High-threshold motor unit recruitment focus. Prioritize mechanical tension and strict tempo control."}
        </p>

        {/* Resource Links (Horizontal Row) */}
        <div className="pt-8 border-t border-white/5">
          <h3 className="text-[9px] font-black tracking-[0.3em] text-zinc-700 mb-6 uppercase">
            Tutorial Resources
          </h3>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#0070FF]/20 border border-white/5 hover:border-[#0070FF]/40 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest text-white group/btn">
              <span className="material-symbols-outlined text-sm text-[#0070FF]">
                play_circle
              </span>
              Technique
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#0070FF]/20 border border-white/5 hover:border-[#0070FF]/40 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest text-white group/btn">
              <span className="material-symbols-outlined text-sm text-[#0070FF]">
                description
              </span>
              Protocol
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const SplitCreationSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          step: "01",
          icon: "analytics",
          title: "RECOVERY AUDIT",
          desc: "Assess your lifestyle constraints. Your split must fit your biological recovery window, not just your calendar.",
        },
        {
          step: "02",
          icon: "calculate",
          title: "VOLUME MATH",
          desc: "Determine total weekly sets per muscle. Divide this by your training days to find your ideal per-session load.",
        },
        {
          step: "03",
          icon: "account_tree",
          title: "PATTERN MAPPING",
          desc: "Assign movement patterns (Push, Pull, Hinge, Squat) to each slot to ensure structural balance and synergy.",
        },
        {
          step: "04",
          icon: "biotech",
          title: "DATA REFINEMENT",
          desc: "Monitor performance markers. Adjust the frequency if strength plateaus or systemic fatigue exceeds recovery.",
        },
      ].map((item) => (
        <Card
          key={item.step}
          type="steps"
          step={item.step}
          icon={item.icon}
          title={item.title}
          body={item.desc}
          className="border border-white/5 hover:border-primary-container/30"
          rounded="rounded-2xl"
        />
      ))}
    </div>
  );
};
