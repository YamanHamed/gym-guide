import React, { useState } from "react";

import frontFull from "../imgs/anatomy/front/front-fullbody.png";
import frontChest from "../imgs/anatomy/front/front-chest.png";
import frontAbs from "../imgs/anatomy/front/front-abs.png";
import frontLegs from "../imgs/anatomy/front/front-legs.png";
import frontDelts from "../imgs/anatomy/front/front-delts.png";
import frontBiceps from "../imgs/anatomy/front/front-biceps.png";
import frontForearms from "../imgs/anatomy/front/front-forearms.png";

import backFull from "../imgs/anatomy/back/back-fullbody.png";
import backBack from "../imgs/anatomy/back/back-back.png";
import backLegs from "../imgs/anatomy/back/back-legs.png";
import backTriceps from "../imgs/anatomy/back/back-triceps.png";
import backForearms from "../imgs/anatomy/back/back-forearms.png";
import backDelts from "../imgs/anatomy/back/back-delts.png";

const Anatomy = () => {
  // We use a single state to track which muscle is being hovered
  const [activeMuscle, setActiveMuscle] = useState(null);

  return (
    <div className=" text-white">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto overflow-hidden px-4 py-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0" />

        {/* === FRONT VIEW COLUMN === */}
        <div className="flex flex-col items-center">
          <h2 className=" text-xl font-bold tracking-widest text-[#68A2CF] uppercase">
            Anterior
          </h2>
          <div
            className="relative aspect-[2/3] mx-auto 
                w-[130%] -translate-x-[11%] 
                md:w-full md:max-w-[400px] md:translate-x-0"
          >
            {/* 1. GROUNDING GLOW: Keeps the focus center-stage */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#68A2CF]/5 blur-[80px] rounded-full z-0" />
            {/* == BASE IMAGE == */}
            <img
              src={frontFull}
              className="absolute inset-0 z-10 w-full h-full object-contain"
              alt="Front Base"
            />
            {/* == MUSCLES LAYERS == */}
            <MuscleOverlay id="chest" active={activeMuscle} src={frontChest} />
            <MuscleOverlay id="abs" active={activeMuscle} src={frontAbs} />
            <MuscleOverlay
              id="front-delts"
              active={activeMuscle}
              src={frontDelts}
            />
            <MuscleOverlay
              id="biceps"
              active={activeMuscle}
              src={frontBiceps}
            />
            <MuscleOverlay
              id="front-forearms"
              active={activeMuscle}
              src={frontForearms}
            />
            <MuscleOverlay
              id="front-legs"
              active={activeMuscle}
              src={frontLegs}
            />
            {/* == HIT BOXES == */}
            <Hitbox
              name="Chest"
              top="24%"
              left="38%"
              width="23%"
              height="9%"
              onHover={() => setActiveMuscle("chest")}
              onLeave={() => setActiveMuscle(null)}
            />
            <Hitbox
              name="Abs"
              top="34%"
              left="39%"
              width="21%"
              height="15%"
              onHover={() => setActiveMuscle("abs")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Left Delt */}
            <Hitbox
              name="Shoulders"
              id="front-delts"
              top="23%"
              left="61%"
              width="7%"
              height="7%"
              onHover={() => setActiveMuscle("front-delts")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Right Delt */}
            <Hitbox
              name="Shoulders"
              id="front-delts"
              top="23%"
              left="32%"
              width="7%"
              height="7%"
              onHover={() => setActiveMuscle("front-delts")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Left Arm */}
            <Hitbox
              name="Biceps"
              id="biceps"
              top="30%"
              left="31%"
              width="7%"
              height="11%"
              onHover={() => setActiveMuscle("biceps")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Right Arm */}
            <Hitbox
              name="Biceps"
              id="biceps"
              top="30%"
              left="62%"
              width="7%"
              height="11%"
              onHover={() => setActiveMuscle("biceps")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Left Arm */}
            <Hitbox
              name="Forearms"
              id="front-forearms"
              top="39%"
              left="27%"
              width="9%"
              height="11%"
              onHover={() => setActiveMuscle("front-forearms")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Right Arm */}
            <Hitbox
              name="Forearms"
              id="front-forearms"
              top="39%"
              left="64%"
              width="9%"
              height="11%"
              onHover={() => setActiveMuscle("front-forearms")}
              onLeave={() => setActiveMuscle(null)}
            />
            <Hitbox
              name="Legs"
              id="front-legs"
              top="50%"
              left="36%"
              width="27%"
              height="36%"
              onHover={() => setActiveMuscle("front-legs")}
              onLeave={() => setActiveMuscle(null)}
            />
          </div>
        </div>

        {/* === BACK VIEW COLUMN === */}
        <div className="flex flex-col items-center">
          <h2 className="mb-6 text-xl font-bold tracking-widest text-[#68A2CF] uppercase">
            Posterior
          </h2>
          <div
            className="relative aspect-[2/3] mx-auto 
                w-[130%] -translate-x-[11%] 
                md:w-full md:max-w-[400px] md:translate-x-0"
          >
            {/* 1. GROUNDING GLOW: Keeps the focus center-stage */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#68A2CF]/5 blur-[80px] rounded-full z-0" />
            {/* Base Image */}
            <img
              src={backFull}
              className="absolute inset-0 z-10 w-full h-full object-contain"
              alt="Back Base"
            />
            {/* == MUSCLES LAYERS == */}
            <MuscleOverlay id="lats" active={activeMuscle} src={backBack} />
            <MuscleOverlay
              id="back-delts"
              active={activeMuscle}
              src={backDelts}
            />
            <MuscleOverlay
              id="back-legs"
              active={activeMuscle}
              src={backLegs}
            />
            <MuscleOverlay
              id="triceps"
              active={activeMuscle}
              src={backTriceps}
            />
            <MuscleOverlay
              id="back-forearms"
              active={activeMuscle}
              src={backForearms}
            />
            {/* == HIT BOXES == */}
            <Hitbox
              name="Back"
              id="lats"
              top="21%"
              left="38%"
              width="24%"
              height="23%"
              onHover={() => setActiveMuscle("lats")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Left Arm */}
            <Hitbox
              name="Shoulders"
              id="back-delts"
              top="23%"
              left="31%"
              width="8%"
              height="6%"
              onHover={() => setActiveMuscle("back-delts")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Right Arm */}
            <Hitbox
              name="Shoulders"
              id="back-delts"
              top="23%"
              left="60%"
              width="8%"
              height="6%"
              onHover={() => setActiveMuscle("back-delts")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Left Arm */}
            <Hitbox
              name="Triceps"
              id="triceps"
              top="29%"
              left="31%"
              width="7%"
              height="10%"
              onHover={() => setActiveMuscle("triceps")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Right Arm */}
            <Hitbox
              name="Triceps"
              id="triceps"
              top="29%"
              left="62%"
              width="7%"
              height="10%"
              onHover={() => setActiveMuscle("triceps")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Left Arm */}
            <Hitbox
              name="Forearms"
              id="back-forearms"
              top="39%"
              left="27%"
              width="9%"
              height="11%"
              onHover={() => setActiveMuscle("back-forearms")}
              onLeave={() => setActiveMuscle(null)}
            />
            {/* Right Arm */}
            <Hitbox
              name="Forearms"
              id="back-forearms"
              top="39%"
              left="64%"
              width="9%"
              height="11%"
              onHover={() => setActiveMuscle("back-forearms")}
              onLeave={() => setActiveMuscle(null)}
            />
            <Hitbox
              name="Legs"
              id="back-legs"
              top="44%"
              left="36%"
              width="27%"
              height="36%"
              onHover={() => setActiveMuscle("back-legs")}
              onLeave={() => setActiveMuscle(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for the glowing muscle layer
const MuscleOverlay = ({ id, active, src }) => (
  <img
    src={src}
    className={`absolute inset-0 z-20 w-full h-full object-contain transition-opacity duration-500 pointer-events-none ${
      active === id ? "opacity-100" : "opacity-0"
    }`}
    alt={id}
  />
);

// Sub-component for the invisible trigger area
const Hitbox = ({ top, left, width, height, name, onHover, onLeave }) => {
  const [isActive, setIsActive] = React.useState(false);

  // Toggle state for mobile tap, then call original hover logic
  const handleInteraction = (bool) => {
    setIsActive(bool);
    if (bool) onHover?.();
    else onLeave?.();
  };

  return (
    <div
      style={{ top, left, width, height }}
      className="absolute z-30 cursor-pointer group"
      onMouseEnter={() => handleInteraction(true)}
      onMouseLeave={() => handleInteraction(false)}
      onClick={() => setIsActive(!isActive)}
    >
      {/* The Label Wrapper */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 -translate-y-full
          pointer-events-none transition-all duration-300 ease-out
          flex flex-col items-center gap-1
          /* Using state + group-hover to ensure it works on both tap and hover */
          ${
            isActive
              ? "opacity-100 -top-4"
              : "opacity-0 -top-2 group-hover:opacity-100 group-hover:-top-4"
          }
        `}
      >
        {/* The Text Tag */}
        <div
          className="
            bg-[#0D0D0D] border border-zinc-800 px-2 py-1 rounded
            shadow-[0_10px_20px_rgba(0,0,0,0.5)]
          "
        >
          <span className="text-zinc-300 font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Anatomy;
