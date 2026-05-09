export const MUSCLE_DETAILS = {
  chest: {
    pageHeader: {
      plainTitle: "Chest",
      highlightedTitle: "Pectoralis",
      body: "The powerhouse of upper body pushing movements and horizontal adduction.",
    },
    sectionHeader: {
      plainTitle: "Chest",
      highlightedTitle: "Anatomy",
      body: "The chest is primarily composed of the Pectoralis Major and the Pectoralis Minor. Understanding how these fibers run is the key to choosing the right pressing angles for a balanced physique.",
    },
    heads: [
      {
        id: 1,
        name: "Upper Chest ",
        description:
          "These fibers originate from the clavicle (collarbone) and run down toward the humerus. They are primarily responsible for shoulder flexion—lifting your arms upward and inward.",
        image: "/assets/anatomy/chest-upper.png",
        links: [
          {
            label: "Incline Press Mechanics",
            url: "https://example.com/upper-pecs",
          },
          {
            label: "Shoulder Flexion Study",
            url: "https://example.com/flexion",
          },
        ],
      },
      {
        id: 2,
        name: "Middle Chest",
        description:
          "The largest portion of the chest. These fibers run horizontally from the sternum. Their main job is horizontal adduction—bringing your arms together across the center of your body.",
        image: "/assets/anatomy/chest-mid.png",
        links: [
          {
            label: "Flat Bench Optimization",
            url: "https://example.com/mid-pecs",
          },
          {
            label: "Horizontal Adduction",
            url: "https://example.com/adduction",
          },
        ],
      },
      {
        id: 3,
        name: "Lower Chest",
        description:
          "The lower fibers of the Pectoralis Major. They originate from the upper part of the abdominal sheath and help with downward pushing movements and shoulder extension.",
        image: "/assets/anatomy/chest-lower.png",
        links: [
          {
            label: "Decline Press Benefits",
            url: "https://example.com/lower-pecs",
          },
          {
            label: "Dip Mechanics",
            url: "https://example.com/dips",
          },
        ],
      },
    ],
  },
  back: {
    pageHeader: {
      plainTitle: "Back",
      highlightedTitle: "Latissimus Dorsi",
      body: "The cornerstone of the 'V-taper.' The back is a complex network of muscles responsible for pulling and stabilization.",
    },
    sectionHeader: {
      plainTitle: "Back",
      highlightedTitle: "Anatomy",
      body: "From the broad lats to the thick traps, training the back requires multiple angles to hit all the distinct muscle groups.",
    },
    heads: [
      {
        id: 1,
        name: "Latissimus Dorsi (Lats)",
        description:
          "The largest muscle in the upper body. These fibers run diagonally and are responsible for pulling the arms down and back.",
        image: "/assets/anatomy/back-lats.png",
        links: [
          { label: "Vertical Pulling Mechanics", url: "#" },
          { label: "Lat Activation Guide", url: "#" },
        ],
      },
      {
        id: 2,
        name: "Trapezius (Traps)",
        description:
          "A large diamond-shaped muscle covering the upper and mid back. It controls scapular elevation and retraction.",
        image: "/assets/anatomy/back-traps.png",
        links: [{ label: "Scapular Movement Study", url: "#" }],
      },
      {
        id: 3,
        name: "Rhomboids & Lower Back",
        description:
          "Key for posture and pulling the shoulder blades together. The Erector Spinae supports the spine during heavy lifts.",
        image: "/assets/anatomy/back-lower.png",
        links: [{ label: "Deadlift Form", url: "#" }],
      },
    ],
  },
  shoulders: {
    pageHeader: {
      plainTitle: "Shoulders",
      highlightedTitle: "Deltoids",
      body: "The 3D look comes from well-rounded deltoids. Crucial for all overhead and pushing movements.",
    },
    sectionHeader: {
      plainTitle: "Shoulders",
      highlightedTitle: "Anatomy",
      body: "The deltoid is split into three distinct heads: front, side, and rear. Each requires a different movement pattern to fully engage.",
    },
    heads: [
      {
        id: 1,
        name: "Anterior (Front) Delt",
        description:
          "Primarily used in pressing and front raising. Originates from the collarbone and assists in internal rotation.",
        image: "/assets/anatomy/shoulders-front.png",
        links: [{ label: "Front Raise Form", url: "#" }],
      },
      {
        id: 2,
        name: "Lateral (Side) Delt",
        description:
          "Responsible for shoulder abduction (lifting arms to the side). This head creates shoulder width.",
        image: "/assets/anatomy/shoulders-side.png",
        links: [{ label: "Side Lateral Mechanics", url: "#" }],
      },
      {
        id: 3,
        name: "Posterior (Rear) Delt",
        description:
          "Located at the back of the shoulder. Essential for shoulder health and posture. Pulls the arms backward.",
        image: "/assets/anatomy/shoulders-rear.png",
        links: [{ label: "Face Pull Science", url: "#" }],
      },
    ],
  },
  biceps: {
    pageHeader: {
      plainTitle: "Biceps",
      highlightedTitle: "Brachii",
      body: "Small but iconic. The biceps are responsible for elbow flexion and forearm supination (turning the palm up).",
    },
    sectionHeader: {
      plainTitle: "Biceps",
      highlightedTitle: "Anatomy",
      body: "Though small, the biceps have two distinct heads and an underlying muscle that dictates the 'peak' and thickness of the arm.",
    },
    heads: [
      {
        id: 1,
        name: "Long Head (Outer)",
        description:
          "The outer portion of the bicep that creates the 'peak.' It runs over the shoulder joint and is best targeted with arms behind the body.",
        image: "/assets/anatomy/biceps-long.png",
        links: [{ label: "Bicep Peak Science", url: "#" }],
      },
      {
        id: 2,
        name: "Short Head (Inner)",
        description:
          "The inner portion that provides bicep thickness and width. It is best targeted with arms in front of the body.",
        image: "/assets/anatomy/biceps-short.png",
        links: [{ label: "Preacher Curl Mechanics", url: "#" }],
      },
    ],
  },
  triceps: {
    pageHeader: {
      plainTitle: "Triceps",
      highlightedTitle: "Brachii",
      body: "Making up two-thirds of the arm's mass, the triceps are the primary extensors of the elbow.",
    },
    sectionHeader: {
      plainTitle: "Triceps",
      highlightedTitle: "Anatomy",
      body: "Named for its three heads, the triceps require varied arm positions to ensure each head is properly stimulated.",
    },
    heads: [
      {
        id: 1,
        name: "Long Head",
        description:
          "The largest head. It attaches to the scapula, meaning it is best stretched when the arm is overhead.",
        image: "/assets/anatomy/triceps-long.png",
        links: [{ label: "Overhead Extension Benefits", url: "#" }],
      },
      {
        id: 2,
        name: "Lateral Head",
        description:
          "Located on the outside of the arm. Responsible for the 'horseshoe' look. Targeted by pushdowns.",
        image: "/assets/anatomy/triceps-lateral.png",
        links: [{ label: "Pushdown Variations", url: "#" }],
      },
      {
        id: 3,
        name: "Medial Head",
        description:
          "The deepest head, mostly visible near the elbow. Provides stability and consistent force.",
        image: "/assets/anatomy/triceps-medial.png",
        links: [{ label: "Elbow Stability", url: "#" }],
      },
    ],
  },
  legs: {
    pageHeader: {
      plainTitle: "Legs",
      highlightedTitle: "Lower Body",
      body: "The foundation of human movement. The largest and most powerful muscle groups in the body.",
    },
    sectionHeader: {
      plainTitle: "Legs",
      highlightedTitle: "Anatomy",
      body: "Training legs involves complex multi-joint movements that engage the quads, hamstrings, glutes, and calves.",
    },
    heads: [
      {
        id: 1,
        name: "Quadriceps",
        description:
          "A group of four muscles on the front of the thigh. They are the primary knee extensors.",
        image: "/assets/anatomy/legs-quads.png",
        links: [{ label: "Squat Depth Study", url: "#" }],
      },
      {
        id: 2,
        name: "Hamstrings",
        description:
          "Located on the back of the thigh. Crucial for knee flexion and hip extension.",
        image: "/assets/anatomy/legs-hams.png",
        links: [{ label: "Hinge Movement Guide", url: "#" }],
      },
      {
        id: 3,
        name: "Glutes",
        description:
          "The strongest muscle group in the body, responsible for hip extension and stabilization.",
        image: "/assets/anatomy/legs-glutes.png",
        links: [{ label: "Glute Activation", url: "#" }],
      },
      {
        id: 4,
        name: "Calves",
        description:
          "Comprised of the Gastrocnemius and Soleus. Responsible for plantar flexion (pointing the toes).",
        image: "/assets/anatomy/legs-calves.png",
        links: [{ label: "Calf Growth Mechanics", url: "#" }],
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
      highlightedTitle: "Antebrachium",
      body: "The foundation of grip strength and the finishing touch on arm development. Essential for every pulling movement in the gym.",
    },
    sectionHeader: {
      plainTitle: "Forearms",
      highlightedTitle: "Anatomy",
      body: "The forearm is a complex intersection of over 20 muscles. We categorize them into the flexor and extensor compartments to simplify your training approach.",
    },
    heads: [
      {
        id: 1,
        name: "Wrist Flexors (Inner)",
        description:
          "Located on the underside of the forearm. These muscles are responsible for curling the palm toward the wrist and are heavily involved in crushing grip strength.",
        image: "/assets/anatomy/forearms-flexors.png",
        links: [
          { label: "Grip Strength Mechanics", url: "#" },
          { label: "Wrist Curl Form", url: "#" },
        ],
      },
      {
        id: 2,
        name: "Wrist Extensors (Outer)",
        description:
          "Located on the top side of the forearm. They allow you to extend your hand backward. Training these is key for wrist stability and preventing 'tennis elbow'.",
        image: "/assets/anatomy/forearms-extensors.png",
        links: [
          { label: "Extensor Stability Study", url: "#" },
          { label: "Reverse Curl Science", url: "#" },
        ],
      },
      {
        id: 3,
        name: "Brachioradialis",
        description:
          "The thick muscle that connects the upper arm to the forearm. It is most active during elbow flexion when the palm is in a neutral (hammer) position.",
        image: "/assets/anatomy/forearms-brachio.png",
        links: [{ label: "Hammer Curl Optimization", url: "#" }],
      },
    ],
  },
};
