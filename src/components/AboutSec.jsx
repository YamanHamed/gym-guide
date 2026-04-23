import React from "react";
import Header from "./Header";
import Hr from "./Hr";
import Card from "./Card";

const STEPS = [
  {
    step: "01",
    title: "EXPLORE",
    icon: "database",
    desc: "450+ high-fidelity exercise protocols with built-in form cues.",
  },
  {
    step: "02",
    title: "SELECT",
    icon: "architecture",
    desc: "Training architecture optimized for your specific recovery capacity.",
  },
  {
    step: "03",
    title: "CONSULT",
    icon: "smart_toy",
    desc: "AI partner to troubleshoot plateaus and refine technique in real-time.",
  },
];

const AboutSec = () => {
  return (
    <>
      <Hr />
      <section className="max-w-7xl mx-auto  py-24">
        <Header
          className="mb-16"
          plainTitle="ABOUT"
          highlightTitle="GYM GUIDE"
          body="Our Gym Guide is a specialized environment designed to bridge the gap between raw effort and scientific progression. We provide the tools; you provide the consistency."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((item) => (
            <Card
              type="steps"
              key={item.step}
              step={item.step} // Passes "01", "02", etc.
              icon={item.icon} // "analytics", "calculate", etc.
              title={item.title}
              body={item.desc}
              className="border border-white/5 hover:border-primary-container/30"
              rounded="rounded-2xl" // Consistent rounded corners
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutSec;
