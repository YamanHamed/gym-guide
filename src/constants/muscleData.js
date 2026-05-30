import upperChestImg from "../imgs/muscles/upper-chest.png";
import midChestImg from "../imgs/muscles/middle-chest.png";
import lowerChestImg from "../imgs/muscles/lower-chest.png";

import latsImg from "../imgs/muscles/lats-back.png";
import upperBackImg from "../imgs/muscles/upper-back.png";
import lowerBackImg from "../imgs/muscles/lower-back.png";
// import trapsImg from "../imgs/muscles/traps-back.png";
// import middleBackImg from "../imgs/muscles/middle-back.png";

import frontdeltImg from "../imgs/muscles/front-shoulders.png";
import sidedeltImg from "../imgs/muscles/side-shoulders.png";
import reardeltImg from "../imgs/muscles/rear-shoulders.png";

import quadsImg from "../imgs/muscles/quads-legs.png";
import hamsImg from "../imgs/muscles/hamstrings-legs.png";
import calvesImg from "../imgs/muscles/calves-legs.png";

import shortBicepsImg from "../imgs/muscles/short-biceps.png";
import longBicepsImg from "../imgs/muscles/long-biceps.png";
import brachialisImg from "../imgs/muscles/brachi-biceps.png";

import tricepsLongImg from "../imgs/muscles/long-triceps.png";
import tricepsLateralImg from "../imgs/muscles/lateral-triceps.png";
import tricepsMedialImg from "../imgs/muscles/medial-triceps.png";

import flexorsForearmsImg from "../imgs/muscles/flexors-forearms.png";
import extensorsForearmsImg from "../imgs/muscles/extensors-forearms.png";
import brachioForearmsImg from "../imgs/muscles/brachirad-forearms.png";

export const MUSCLE_DETAILS = {
  chest: {
    pageHeader: {
      plainTitle: "Chest",
      highlightedTitle: "Muscle",
      body: "the needed knowledge to build a powerful chest",
    },
    sectionHeader: {
      plainTitle: "Chest",
      highlightedTitle: "Anatomy",
      body: "The chest has three main heads : upper ,middle and lower. ",
      note: " Any chest exercise will target all three heads but when we say that this is an upper chest exercise for an example , this means that the exercise activates the upper head the most , but it still activates the middle and lower head with lesser precentage.",
    },
    headNames: ["upper chest", "middle chest", "lower chest"],
    heads: [
      {
        id: 1,
        name: "Upper Chest ",
        description:
          "The upper chest is one hardest heads to grow , it is resposible of the 3d look of the chest. It is mostly activated by incline movements ( incline press, incline flyes ...etc) ",
        image: upperChestImg,
      },
      {
        id: 2,
        name: "Middle Chest",
        description:
          "The largest head of the chest so it gives the size. It is mostly activated by flat movements ( flat press, flat flyes ...etc) ",
        image: midChestImg,
      },
      {
        id: 3,
        name: "Lower Chest",
        description:
          "The lower chest is mostly activated by decline movements ( decline press, dips ...etc)",
        image: lowerChestImg,
      },
    ],
  },

  back: {
    pageHeader: {
      plainTitle: "Back",
      highlightedTitle: "Muscle",
      body: "the needed knowledge to build a powerful back",
    },
    sectionHeader: {
      plainTitle: "Back",
      highlightedTitle: "Anatomy",
      body: "The back has three main heads: lats (wing muscles), upper back and lower back.",
      note: "Any back exercise will target all three heads but when we say that this is a lat exercise for example, this means that the exercise activates the lats the most, but it still activates the upper and lower back with lesser percentage.",
    },
    headNames: ["lats", "upper back", "lower back"],
    heads: [
      {
        id: 1,
        name: "Lats ",
        description:
          "The lats give your back that V‑shape look. They are mostly activated by pulling movements (pull‑ups, lat pulldowns, rows).",
        image: latsImg,
      },
      {
        id: 2,
        name: "Upper Back",
        description:
          "The upper back adds thickness and helps with posture. It is mostly activated by rowing movements (bent‑over rows, face pulls, shrugs).",
        image: upperBackImg,
      },
      {
        id: 3,
        name: "Lower Back",
        description:
          "The lower back stabilises your spine and helps with heavy lifts. It is mostly activated by extension movements (deadlifts, back extensions).",
        image: lowerBackImg,
      },
    ],
  },
  shoulders: {
    pageHeader: {
      plainTitle: "Shoulders",
      highlightedTitle: "Muscle",
      body: "the needed knowledge to build strong, rounded shoulders",
    },
    sectionHeader: {
      plainTitle: "Shoulders",
      highlightedTitle: "Anatomy",
      body: "The shoulder (delts) has three heads: front, side, and rear.",
    },
    headNames: ["front delt", "side delt", "rear delt"],
    heads: [
      {
        id: 1,
        name: "Front Delt ",
        description:
          "The front delt is involved in most pressing movements. It is mostly activated by overhead presses and front raises.",
        image: frontdeltImg,
      },
      {
        id: 2,
        name: "Side Delt ",
        description:
          "The side delt gives your shoulder width. It is mostly activated by lateral raises.",
        image: sidedeltImg,
      },
      {
        id: 3,
        name: "Rear Delt ",
        description:
          "The rear delt gives the shoulder the 3d look. It is mostly activated by face pulls, reverse flyes.",
        image: reardeltImg,
      },
    ],
  },
  biceps: {
    pageHeader: {
      plainTitle: "Biceps",
      highlightedTitle: "Muscle",
      body: "the needed knowledge to build arm peaks",
    },
    sectionHeader: {
      plainTitle: "Biceps",
      highlightedTitle: "Anatomy",
      body: "The biceps has two heads: long head (outer) and short head (inner). A third muscle, the brachialis, sits underneath and adds thickness.",
      note: "Any biceps exercise will target all heads but when we say that this is a long head exercise, this means that the exercise activates the outer head the most, but it still activates the short head with lesser percentage.",
    },
    headNames: ["long head", "short head", "brachialis"],
    heads: [
      {
        id: 1,
        name: "Long Head (Outer)",
        description:
          "The long head is mostly activated by curls but when your arms are behind your body (incline curls, cable curls with elbows back).",
        image: longBicepsImg,
      },
      {
        id: 2,
        name: "Short Head (Inner)",
        description:
          "The short head is mostly activated by curls but when your arms are infront of your body (preacher curls).",
        image: shortBicepsImg,
      },
      {
        id: 3,
        name: "Brachialis",
        description:
          "The brachialis gives more thickness and width to the arm. It is mostly activated by hammer curls.",
        image: brachialisImg,
      },
    ],
  },
  triceps: {
    pageHeader: {
      plainTitle: "Triceps",
      highlightedTitle: "Muscle",
      body: "the needed knowledge to build powerful arms",
    },
    sectionHeader: {
      plainTitle: "Triceps",
      highlightedTitle: "Anatomy",
      body: "The triceps has three heads: long head (inner), lateral head (outer), and medial head (small head near elbow).",
      note: "Any triceps exercise will target all three heads but when we say that this is a long head exercise, this means that the exercise activates this head the most, but it still activates the lateral and medial heads with lesser percentage.",
    },
    headNames: ["long head", "lateral head", "medial head"],
    heads: [
      {
        id: 1,
        name: "Long Head",
        description:
          "The long head is the biggest head of the triceps. It is mostly activated by overhead extensions (overhead cable/dumbbell extensions).",
        image: tricepsLongImg,
      },
      {
        id: 2,
        name: "Lateral Head",
        description:
          "The lateral head creates the horseshoe shape on the outside of your arm. It is mostly activated by pushdowns (cable pushdowns).",
        image: tricepsLateralImg,
      },
      {
        id: 3,
        name: "Medial Head",
        description:
          "The medial head is small head but helps with pressing movements. It is mostly activated by any triceps exercise especially lateral head exercises.",
        image: tricepsMedialImg,
      },
    ],
  },
  legs: {
    pageHeader: {
      plainTitle: "Legs",
      highlightedTitle: "Muscle",
      body: "the needed knowledge to build strong, powerful legs",
    },
    sectionHeader: {
      plainTitle: "Legs",
      highlightedTitle: "Anatomy",
      body: "Your legs have three main groups: quads (front), hamstrings (back), and calves (lower leg).",
      note: "Legs is a complex muscle group and there are many exercises that target each group. But some exercises like squat work all groups ( this kind of exercise is called a compound movement ), and some exercises target one group more than the others (this kind of exercise is called an isolation movement ) ",
    },
    headNames: ["quads", "hamstrings", "calves"],
    heads: [
      {
        id: 1,
        name: "Quads (Front Thigh)",
        description:
          "The quads extend your knee. They are mostly activated by squats, leg presses, lunges, and leg extensions.",
        image: quadsImg,
      },
      {
        id: 2,
        name: "Hamstrings (Back Thigh)",
        description:
          "The hamstrings bend your knee and extend your hip. They are mostly activated by Romanian deadlifts, leg curls.",
        image: hamsImg,
      },
      {
        id: 3,
        name: "Calves",
        description:
          "The calves are mostly activated by standing calf raises (straight leg) and seated calf raises (knees bent).",
        image: calvesImg,
      },
    ],
  },
  abs: {
    pageHeader: {
      plainTitle: "Abs",
      highlightedTitle: "The Core",
      body: "More than just aesthetics; the core is vital for stability, power transfer, and spinal protection.",
    },
    sectionHeader: {
      plainTitle: "Abs",
      highlightedTitle: "Anatomy",
      body: "The core includes the visible 'six-pack' muscles as well as the deeper stabilization muscles and the obliques.",
    },
    headNames: ["rectus-abdominis", "obliques"],
    heads: [
      {
        id: 1,
        name: "Rectus Abdominis",
        description:
          "The classic 'six-pack' muscle. It flexes the spine and brings the pelvis toward the chest.",
        image: "/assets/anatomy/abs-rectus.png",
        links: [{ label: "Spinal Flexion Safety", url: "#" }],
      },
      {
        id: 2,
        name: "Obliques",
        description:
          "Located on the sides of the torso. Responsible for rotation and lateral flexion of the spine.",
        image: "/assets/anatomy/abs-obliques.png",
        links: [{ label: "Rotational Power", url: "#" }],
      },
    ],
  },
  forearms: {
    pageHeader: {
      plainTitle: "Forearms",
      highlightedTitle: "Muscle",
      body: "the needed knowledge to build strong, defined forearms",
    },
    sectionHeader: {
      plainTitle: "Forearms",
      highlightedTitle: "Anatomy",
      body: "The forearms have three heads: flexors (palm side), extensors (back of hand side), and brachioradialis (thumb side).",
      note: "the forearms are involved in almost every upper body exercise. So you might see people ignoring training them , but it is preferable to include one forearms exercise in your routine.",
    },
    headNames: ["flexors", "extensors", "brachioradialis"],
    heads: [
      {
        id: 1,
        name: "Flexors (Palm Side)",
        description:
          "The wrist flexors is one of the biggest muscles in the forearm. It is mostly activated by wrist curls.",
        image: flexorsForearmsImg,
      },
      {
        id: 2,
        name: "Extensors (Back of Hand)",
        description:
          "The extensors bend your wrist back. They are mostly activated by reverse wrist curls.",
        image: extensorsForearmsImg,
      },
      {
        id: 3,
        name: "Brachioradialis (Thumb Side)",
        description:
          "The brachioradialis adds thickness to the upper forearm. It is mostly activated by reverse curls.",
        image: brachioForearmsImg,
      },
    ],
  },
};
