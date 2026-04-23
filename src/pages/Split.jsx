import React, { useState } from "react";
import cover from "../imgs/gym-cover-03.webp";
import Header from "../components/Header";
import Card from "../components/Card";
import Hr from "../components/Hr";
import Note from "../components/Note";
import { useNavigate } from "react-router";
const pplSchedule = [
  {
    focus: "Push Day",
    sub: "Anterior Chain Focus",
    exercises: [
      { name: "Barbell Bench Press", url: "/library/bench-press" },
      { name: "Overhead Press", url: "/library/ohp" },
      { name: "Incline DB Flyes", url: "/library/db-flyes" },
      { name: "Tricep Rope Pushdowns", url: "/library/tricep-pushdown" },
    ],
  },
  {
    focus: "Pull Day",
    sub: "Posterior Chain Focus",
    exercises: [
      { name: "Weighted Pull-ups", url: "/library/pull-ups" },
      { name: "Barbell Rows", url: "/library/rows" },
      { name: "Face Pulls", url: "/library/face-pulls" },
      { name: "Hammer Curls", url: "/library/hammer-curls" },
    ],
  },
  {
    focus: "Leg Day",
    sub: "Lower Body / Hypertrophy",
    exercises: [
      { name: "Back Squats", url: "/library/squats" },
      { name: "Romanian Deadlifts", url: "/library/rdl" },
      { name: "Leg Extensions", url: "/library/leg-extension" },
      { name: "Seated Calf Raises", url: "/library/calf-raise" },
    ],
  },
  {
    focus: "Rest Day  ",
    sub: "Recovery ",
    rest: true,
  },
];

const Split = () => {
  return (
    <div>
      <Header
        pageHeader={true}
        plainTitle="PUSH "
        highlightTitle="DAY"
        subTitle="Hypertrophy & Power"
        body="Focusing on the anterior chain. Prioritizing clavicular head and medial deltoid development."
        className="mb-20"
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
        titleSize="text-5xl md:text-7xl"
        bodyClassName="max-w-[280px]"
        isSubPage={true}
      />
      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle="PROTOCOL"
          highlightTitle="BREAKDOWN"
          subTitle="PPL Systemic Overview"
          body="The Push/Pull/Legs (PPL) framework is a movement-pattern-based architecture designed to maximize overlap in muscle recruitment while providing dedicated 48-72 hour recovery windows. By grouping muscle fibers that function synergistically, we ensure that secondary movers—like the triceps in a bench press or the biceps in a row—are fully utilized within a single session rather than being fatigued across multiple days."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <Card
            rounded="rounded-2xl"
            type="top-image"
            title="PUSH"
            image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGYlMjBwdXNoJTIwcHVsbCUyMGxlZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            body="Chest, Shoulders, & Triceps focus."
          />
          <Card
            rounded="rounded-2xl"
            type="top-image"
            title="PULL"
            image={cover}
            body="Back, Rear Delts, & Biceps focus."
          />
          <Card
            rounded="rounded-2xl"
            type="top-image"
            title="LEGS"
            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGYlMjB1cHBlciUyMGxvd2VyJTIwc2VjdGlvbnnwZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            body="Quads, Hamstrings, & Calves focus."
          />
        </div>
      </section>
      <Hr />
      <section>
        <Header
          plainTitle="SESSION"
          highlightTitle="BREAKDOWN"
          body="A tactical distribution of volume across the weekly cycle. This example sequence prioritizes compound movements followed by targeted isolation to ensure mechanical tension and metabolic stress."
          className="mb-16 "
        />
        <SplitSchedule
          className="mb-6"
          title=" Split -1 "
          schedule={pplSchedule}
        />
        <SplitSchedule
          className="mb-6"
          title=" split -2 "
          schedule={pplSchedule}
        />
        <Note
          className="max-w-xl"
          body={`These three sessions are designed to recruit every major motor unit
            in the body. Because each day targets specific muscle groups, you
            can organize them in any order that suits your current recovery
            capacity. Whether you train three days a week (Push, Pull, Legs) or
            six days (repeating the cycle), the priority remains mechanical
            tension and consistency.
            `}
          linkText="Learn More"
          linkUrl="/tips/custom-splits"
        />
      </section>
    </div>
  );
};

export default Split;

const SplitSchedule = ({ title, schedule, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01] ${className}`}
    >
      {/* === HEADER ROW === */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 transition-colors duration-300 ${
          isOpen ? "bg-white/5 border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-4">
          <span
            className={`material-symbols-outlined !hidden md:!inline-block  transition-colors ${isOpen ? "text-primary-container" : "text-zinc-500"}`}
          >
            fitness_center
          </span>
          <h3 className="text-white text-xl font-black italic uppercase ">
            {title}
          </h3>
        </div>

        <span
          className={`material-symbols-outlined text-zinc-500 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>

      {/* === SCHEDULE CONTENT === */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="divide-y divide-white/5">
            {schedule.map((row, i) => (
              <div
                key={i}
                className={`flex flex-col md:grid md:grid-cols-12 p-6 gap-4 md:gap-0 transition-colors ${row.rest ? "bg-black/40" : ""} `}
              >
                {/* == DAY NAME  == */}
                <div className="md:col-span-4 self-start ">
                  <div className="text-white text-lg font-black italic uppercase leading-relaxed ">
                    {row.focus}
                  </div>
                  <div className=" text-zinc-500 text-[10px] font-bold uppercase tracking-[0.1rem] mt-2">
                    {row.sub}
                  </div>
                </div>

                {/* == DAY MOVEMENTS == */}
                <div className="md:col-span-8 md:pl-6 md:border-l border-white/10 flex items-center pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                  <div className="flex flex-wrap gap-2 w-full">
                    {row.rest ? (
                      <span className="text-zinc-400 text-sm font-bold  tracking-wider uppercase font-medium py-1">
                        RESTING
                      </span>
                    ) : (
                      row.exercises?.map((ex, idx) => (
                        <button
                          key={idx}
                          onClick={() => navigate(ex.url)}
                          className="px-3 py-2 md:py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] text-zinc-400 font-bold uppercase tracking-wider hover:text-white hover:border-[#0070FF]/50 transition-colors"
                        >
                          {ex.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Sec1 = () => (
  <>
    <Header
      plainTitle="THE PPL"
      highlightTitle="PROTOCOL"
      body="The Push/Pull/Legs split organizes training by movement patterns rather than isolated muscles. By grouping the chest, shoulders, and triceps (Push), back and biceps (Pull), and the entire lower body (Legs), you complete a full-body cycle in 3 sessions—typically repeating the sequence every 4 to 7 days."
      className="mb-16 "
    />

    <section className="max-w-7xl mx-auto mb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
        {[
          {
            label: "Commitment",
            value: "3–6 DAYS",
            icon: "calendar_today",
          },
          { label: "Primary Focus", value: "FULL BODY", icon: "target" },
          { label: "Avg. Duration", value: "60 MIN", icon: "timer" },
          {
            label: "Requirement",
            icon: "psychology",
            value: "ENTRY LEVEL",
          },
        ].map((item, i) => (
          <Card
            key={i}
            bg="dark"
            icon={item.icon}
            tag={item.label}
            title={item.value}
            titleSize="text-2xl"
            titleClassName="mb-0" // Removed the bottom margin since there's no body text
            border="none" // Assuming you might want to add a 'none' key to your borderStyles
            className="border-none" // We use the grid gap-px for the borders instead
          />
        ))}
      </div>
    </section>
  </>
);
