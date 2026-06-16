// === MUSCLE CARDS ===
import upperChestImg from "../imgs/muscles/upper-chest.png";
import midChestImg from "../imgs/muscles/middle-chest.png";
import lowerChestImg from "../imgs/muscles/lower-chest.png";

import latsImg from "../imgs/muscles/lats-back.png";
import upperBackImg from "../imgs/muscles/upper-back.png";
import lowerBackImg from "../imgs/muscles/lower-back.png";

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

import abdominalAbsImg from "../imgs/muscles/abdominals-abs.png";
import obliquesAbsImg from "../imgs/muscles/opliques-abs.png";

// ===  PAGE COVERS ===
import chestCover from "../imgs/covers/chest-cover-01.png";
import backCover from "../imgs/covers/back-cover-01.png";
import shouldersCover from "../imgs/covers/shoulders-cover-01.png";
import bicepsCover from "../imgs/covers/biceps-cover-01.png";
import tricepsCover from "../imgs/covers/triceps-cover-01.png";
import legsCover from "../imgs/covers/legs-cover-01.png";
import absCover from "../imgs/covers/abs-cover-01.png";
import forearmsCover from "../imgs/covers/forearms-cover-01.png";

export const MUSCLE_DETAILS = {
  chest: {
    pageHeader: {
      plainTitle: "Chest",
      plainTitle_ar: "عضلات",
      highlightedTitle: "Muscle",
      highlightedTitle_ar: "الصدر",
      body: "the needed knowledge to build a powerful chest",
      body_ar: "المعرفة اللازمة لبناء صدر قوي",
      image: chestCover,
    },
    sectionHeader: {
      plainTitle: "Chest",
      plainTitle_ar: "تشريح",
      highlightedTitle: "Anatomy",
      highlightedTitle_ar: "الصدر",
      body: "The chest has three main heads : upper ,middle and lower. ",
      body_ar: "يتكون الصدر من ثلاثة رؤوس رئيسية: العلوي، الأوسط، والسفلي.",
      note: " Any chest exercise will target all three heads but when we say that this is an upper chest exercise for an example , this means that the exercise activates the upper head the most , but it still activates the middle and lower head with lesser precentage.",
      note_ar:
        "أي تمرين للصدر سيستهدف جميع الرؤوس الثلاثة، لكن عندما نقول أن هذا تمرين للصدر العلوي مثلاً، فهذا يعني أن التمرين ينشط الرأس العلوي أكثر، لكنه لا يزال ينشط الرأس الأوسط والسفلي بنسبة أقل.",
    },
    headNames: ["upper chest", "middle chest", "lower chest"],
    headNames_ar: ["الصدر العلوي", "الصدر الأوسط", "الصدر السفلي"],
    heads: [
      {
        id: 1,
        name: "Upper Chest",
        name_ar: "الصدر العلوي",
        description:
          "The upper chest is one hardest heads to grow , it is resposible of the 3d look of the chest. It is mostly activated by incline movements ( incline press, incline flyes ...etc) ",
        description_ar:
          "الصدر العلوي من أصعب الرؤوس نمواً، وهو المسؤول عن المظهر ثلاثي الأبعاد للصدر. يتم التركيز عليه بشكل أساسي بتمارين ضغط البنش العالي ",
        image: upperChestImg,
      },
      {
        id: 2,
        name: "Middle Chest",
        name_ar: "الصدر الأوسط",
        description:
          "The largest head of the chest so it gives the size. It is mostly activated by flat movements ( flat press, flat flyes ...etc) ",
        description_ar:
          "أكبر رأس في الصدر، لذا فهو يعطي الحجم. يتم التركيز عليه بشكل أساسي بتمارين ضغط البنش المستوى ",
        image: midChestImg,
      },
      {
        id: 3,
        name: "Lower Chest",
        name_ar: "الصدر السفلي",
        description:
          "The lower chest is mostly activated by decline movements ( decline press, dips ...etc)",
        description_ar:
          "يتم التركيز الصدر السفلي بشكل أساسي بحركات البنش  و التجميع السفلي ",
        image: lowerChestImg,
      },
    ],
  },
  back: {
    pageHeader: {
      plainTitle: "Back",
      plainTitle_ar: "عضلات",
      highlightedTitle: "Muscle",
      highlightedTitle_ar: "الظهر",
      body: "the needed knowledge to build a powerful back",
      body_ar: "المعرفة اللازمة لبناء ظهر قوي",
      image: backCover,
    },
    sectionHeader: {
      plainTitle: "Back",
      plainTitle_ar: "تشريح",
      highlightedTitle: "Anatomy",
      highlightedTitle_ar: "الظهر",
      body: "The back has three main heads: lats (wing muscles), upper back and lower back.",
      body_ar:
        "يتكون الظهر من ثلاثة رؤوس رئيسية: العضلة العريضة (عضلات الجناح)، الجزء العلوي من الظهر، والجزء السفلي من الظهر.",
      note: "Any back exercise will target all three heads but when we say that this is a lat exercise for example, this means that the exercise activates the lats the most, but it still activates the upper and lower back with lesser percentage.",
      note_ar:
        "أي تمرين للظهر سيستهدف جميع الرؤوس الثلاثة، لكن عندما نقول أن هذا تمرين للعضلة العريضة مثلاً، فهذا يعني أن التمرين ينشط العضلة العريضة أكثر، لكنه لا يزال ينشط الجزء العلوي والسفلي من الظهر بنسبة أقل.",
    },
    headNames: ["lats", "upper back", "lower back"],
    headNames_ar: ["العضلة العريضة (اللاتس)", "الظهر العلوي", "الظهر السفلي"],
    heads: [
      {
        id: 1,
        name: "Lats",
        name_ar: "عضلة الجناح (اللاتس)",
        description:
          "The lats give your back that V‑shape look. They are mostly activated by pulling movements (pull‑ups, lat pulldowns, rows).",
        description_ar:
          "عضلة الجناح  تمنح ظهرك مظهر حرف V. يتم التركيز عليها بشكل أساسي بتمارين السحب العلوي.",
        image: latsImg,
      },
      {
        id: 2,
        name: "Upper Back",
        name_ar: "الظهر العلوي",
        description:
          "The upper back adds thickness and helps with posture. It is mostly activated by rowing movements (bent‑over rows, face pulls, shrugs).",
        description_ar:
          "الظهر العلوي يزيد من السمك ويساعد في شد الظهر. يتم التركيز عليه بشكل أساسي بحركات التجديف السفلية و السحب الارضي.",
        image: upperBackImg,
      },
      {
        id: 3,
        name: "Lower Back",
        name_ar: "الظهر السفلي",
        description:
          "The lower back stabilises your spine and helps with heavy lifts. It is mostly activated by extension movements (deadlifts, back extensions).",
        description_ar:
          "الظهر السفلي يعمل على تثبيت عمودك الفقري ويساعد في الرفعات الثقيلة. يتم التركيز عيله بمعطم تمارين الظهر اهمها الرفعة الميتة ، التمرين الروماني.",
        image: lowerBackImg,
      },
    ],
  },
  shoulders: {
    pageHeader: {
      plainTitle: "Shoulders",
      plainTitle_ar: "عضلات",
      highlightedTitle: "Muscle",
      highlightedTitle_ar: "الكتفين",
      body: "the needed knowledge to build strong, rounded shoulders",
      body_ar: "المعرفة اللازمة لبناء أكتاف قوية مستديرة",
      image: shouldersCover,
    },
    sectionHeader: {
      plainTitle: "Shoulders",
      plainTitle_ar: "تشريح",
      highlightedTitle: "Anatomy",
      highlightedTitle_ar: "الكتفين",
      body: "The shoulder (delts) has three heads: front, side, and rear.",
      body_ar: "تتكون عضلة الكتف من ثلاثة رؤوس : أمامي، جانبي، وخلفي.",
    },
    headNames: ["front delt", "side delt", "rear delt"],
    headNames_ar: ["الكتف الامامي", "الكتف الجانبي", "الكتف الخلفي"],
    heads: [
      {
        id: 1,
        name: "Front Delt",
        name_ar: " الكتف الامامي",
        description:
          "The front delt is involved in most pressing movements. It is mostly activated by overhead presses and front raises.",
        description_ar:
          "يشارك الكتف الامامي في معظم حركات الضغط. يتم التركيز عليه بشكل أساسي بالضغط العلوي الرفرفة الأمامية.",
        image: frontdeltImg,
      },
      {
        id: 2,
        name: "Side Delt",
        name_ar: "الكتف الجانبي",
        description:
          "The side delt gives your shoulder width. It is mostly activated by lateral raises.",
        description_ar:
          "الكتف الجانبي يعطي الكتف عرضه. يتم التركيز عليه بشكل أساسي بالرفرفة الجانبية.",
        image: sidedeltImg,
      },
      {
        id: 3,
        name: "Rear Delt",
        name_ar: "الكتف الخلفي",
        description:
          "The rear delt gives the shoulder the 3d look. It is mostly activated by face pulls, reverse flyes.",
        description_ar:
          "الكتف الخلفي يعطي الكتف المظهر ثلاثي الأبعاد. يتم التركيز عليه بشكل أساسي بالرفرفة العكسية.",
        image: reardeltImg,
      },
    ],
  },
  biceps: {
    pageHeader: {
      plainTitle: "Biceps",
      plainTitle_ar: "عضلات",
      highlightedTitle: "Muscle",
      highlightedTitle_ar: "البايسبس",
      body: "the needed knowledge to build arm peaks",
      body_ar: "المعرفة اللازمة لبناء قمم الذراعين",
      image: bicepsCover,
    },
    sectionHeader: {
      plainTitle: "Biceps",
      plainTitle_ar: "تشريح",
      highlightedTitle: "Anatomy",
      highlightedTitle_ar: "البايسبس",
      body: "The biceps has two heads: long head (outer) and short head (inner). A third muscle, the brachialis, sits underneath and adds thickness.",
      body_ar:
        'تتكون البايسبس من رأسين: الرأس الطويل (الخارجي) والرأس القصير (الداخلي). لكن توجد عضلة ثالثة بجانبها تسمى "البراكياليس"  .',
      note: "Any biceps exercise will target all heads but when we say that this is a long head exercise, this means that the exercise activates the outer head the most, but it still activates the short head with lesser percentage.",
      note_ar:
        "أي تمرين للبايسبس سيستهدف جميع الرؤوس، لكن عندما نقول أن هذا تمرين للرأس الطويل، فهذا يعني أن التمرين ينشط الرأس الخارجي أكثر، لكنه لا يزال ينشط الرأس القصير بنسبة أقل.",
    },
    headNames: ["long head", "short head", "brachialis"],
    headNames_ar: ["الرأس الطويل", "الرأس القصير", "البراكياليس "],
    heads: [
      {
        id: 1,
        name: "Long Head (Outer)",
        name_ar: "الرأس الطويل (الخارجي)",
        description:
          "The long head is mostly activated by curls but when your arms are behind your body (incline curls, cable curls with elbows back).",
        description_ar:
          "يتم التركيز على الرأس الطويل بشكل أساسي بالتمارين التي تكون فيها ذراعيك خلف جسمك ( التبادل على الكرسي العلوي , التبادل على الكابل و يديك خلف جسمك).",
        image: longBicepsImg,
      },
      {
        id: 2,
        name: "Short Head (Inner)",
        name_ar: "الرأس القصير (الداخلي)",
        description:
          "The short head is mostly activated by curls but when your arms are infront of your body (preacher curls).",
        description_ar:
          "يتم التركيز على الرأس القصير بشكل أساسي بالتمارين التي تكون فيها ذراعيك أمام جسمك (تمارين التبادل على الكرسي و يديك امام جسمك).",
        image: shortBicepsImg,
      },
      {
        id: 3,
        name: "Brachialis",
        name_ar: "البراكياليس",
        description:
          "The brachialis gives more thickness and width to the arm. It is mostly activated by hammer curls.",
        description_ar:
          "البراكياليس  تزيد من سماكة وعرض الذراع. يتم التركيز عليها بشكل أساسي بتمارين المطرقة.",
        image: brachialisImg,
      },
    ],
  },
  triceps: {
    pageHeader: {
      plainTitle: "Triceps",
      plainTitle_ar: "عضلات",
      highlightedTitle: "Muscle",
      highlightedTitle_ar: "الترايسبس",
      body: "the needed knowledge to build powerful arms",
      body_ar: "المعرفة اللازمة لبناء أذرع قوية",
      image: tricepsCover,
    },
    sectionHeader: {
      plainTitle: "Triceps",
      plainTitle_ar: "تشريح",
      highlightedTitle: "Anatomy",
      highlightedTitle_ar: "الترايسبس",
      body: "The triceps has three heads: long head (inner), lateral head (outer), and medial head (small head near elbow).",
      body_ar:
        "تتكون الترايسبس من ثلاثة رؤوس: الرأس الطويل ، الرأس الجانبي ، والرأس الداخلي (رأس صغير بالقرب من المرفق).",
      note: "Any triceps exercise will target all three heads but when we say that this is a long head exercise, this means that the exercise activates this head the most, but it still activates the lateral and medial heads with lesser percentage.",
      note_ar:
        "أي تمرين للترايسبس سيستهدف جميع الرؤوس الثلاثة، لكن عندما نقول أن هذا تمرين للرأس الطويل، فهذا يعني أن التمرين ينشط هذا الرأس أكثر، لكنه لا يزال ينشط الرأس الجانبي و الداخلي بنسبة أقل.",
    },
    headNames: ["long head", "lateral head", "medial head"],
    headNames_ar: ["الرأس الطويل", "الرأس الجانبي", "الرأس الداخلي"],
    heads: [
      {
        id: 1,
        name: "Long Head",
        name_ar: "الرأس الطويل",
        description:
          "The long head is the biggest head of the triceps. It is mostly activated by overhead extensions (overhead cable/dumbbell extensions).",
        description_ar:
          "الرأس الطويل هو أكبر رأس في الترايسبس. يتم التركيز عليه بشكل أساسي في التمارين التي تكون فيها الذراع متجهة للاعلى ( كيبل فوق الراس , دامبل فوق الراس ).",
        image: tricepsLongImg,
      },
      {
        id: 2,
        name: "Lateral Head",
        name_ar: "الرأس الجانبي",
        description:
          "The lateral head creates the horseshoe shape on the outside of your arm. It is mostly activated by pushdowns (cable pushdowns).",
        description_ar:
          "الرأس الجانبي يعطي شكل حدوة الحصان على الجزء الخارجي من ذراعك. يتم التركيز عليه بشكل أساسي في التمارين التي يكون فيها الذراع بجانب الجسم , اي متجهة للاسفل ( ضغط بالكيبل للاسفل).",
        image: tricepsLateralImg,
      },
      {
        id: 3,
        name: "Medial Head",
        name_ar: "الرأس الداخلي",
        description:
          "The medial head is small head but helps with pressing movements. It is mostly activated by any triceps exercise especially lateral head exercises.",
        description_ar:
          "الرأس الداخليس رأس صغير لكنه يساعد في حركات الضغط. يتم تنشيطه بشكل أساسي بأي تمرين للترايسبس وخاصة تمارين الرأس الجانبي.",
        image: tricepsMedialImg,
      },
    ],
  },
  legs: {
    pageHeader: {
      plainTitle: "Legs",
      plainTitle_ar: "عضلات",
      highlightedTitle: "Muscle",
      highlightedTitle_ar: "الأرجل",
      body: "the needed knowledge to build strong, powerful legs",
      body_ar: "المعرفة اللازمة لبناء أرجل قوية",
      image: legsCover,
    },
    sectionHeader: {
      plainTitle: "Legs",
      plainTitle_ar: "تشريح",
      highlightedTitle: "Anatomy",
      highlightedTitle_ar: "الأرجل",
      body: "Your legs have three main groups: quads (front), hamstrings (back), and calves (lower leg).",
      body_ar:
        "تتكون أرجل من ثلاث مجموعات رئيسية: الارجل الأمامية، الخلفية و السمانة.",
      note: "Legs is a complex muscle group and there are many exercises that target each group. But some exercises like squat work all groups ( this kind of exercise is called a compound movement ), and some exercises target one group more than the others (this kind of exercise is called an isolation movement ) ",
      note_ar:
        "الأرجل هي مجموعة عضلية معقدة وهناك العديد من التمارين التي تستهدف كل مجموعة. لكن بعض التمارين مثل السكوات تستهدف تقريبا جميع المجموعات (هذا النوع من التمارين يسمى تمرين مركب)، وبعض التمارين تستهدف مجموعة واحدة أكثر من غيرها (هذا النوع يسمى تمرين عازل).",
    },
    headNames: ["quads", "hamstrings", "calves"],
    headNames_ar: [" الارجل الامامية", " الارجل الخلفية", "السمانة"],
    heads: [
      {
        id: 1,
        name: "Quads (Front Thigh)",
        name_ar: "الارجل الامامية",
        description:
          "The quads extend your knee. They are mostly activated by squats, leg presses, lunges, and leg extensions.",
        description_ar:
          " الارجل الامامية تقوم بفرد الركبة. يتم التركيز عليها بشكل أساسي بتمارين السكوات , تمرين المكبس ، الاندفاع نحو الامام ، تمرين الطاولة الامامي.",
        image: quadsImg,
      },
      {
        id: 2,
        name: "Hamstrings (Back Thigh)",
        name_ar: "الارجل الخلفية",
        description:
          "The hamstrings bend your knee and extend your hip. They are mostly activated by Romanian deadlifts, leg curls.",
        description_ar:
          " الارجل الخلفبة تقوم بثني الركبة يتم التركيز عليها بشكل أساسي بتمارين الرفعة الميتة, الروماني، تمرين الطاولة الخلفية.",
        image: hamsImg,
      },
      {
        id: 3,
        name: "Calves",
        name_ar: "السمانة",
        description:
          "The calves are mostly activated by standing calf raises (straight leg) and seated calf raises (knees bent).",
        description_ar:
          "يتم تنشيط السمانة بشكل أساسي بواسطة رفع السمانة واقفاً (رجل مستقيمة) او جالساً (ركبتان مثنيتان).",
        image: calvesImg,
      },
    ],
  },
  abs: {
    pageHeader: {
      plainTitle: "Abs",
      plainTitle_ar: "عضلات",
      highlightedTitle: "The Core",
      highlightedTitle_ar: "البطن",
      body: "More than just aesthetics; the core is vital for stability, power transfer, and spinal protection.",
      body_ar: "المعرفة اللازمة لبناء عضلات بطن قوية",
      image: absCover,
    },
    sectionHeader: {
      plainTitle: "Abs",
      plainTitle_ar: "البطن",
      highlightedTitle: "Anatomy",
      highlightedTitle_ar: "التشريح",
      body: "The core includes the visible 'six-pack' muscles as well as the deeper stabilization muscles and the obliques.",
      body_ar:
        "يتضمن الجذع عضلات 'الستة باك' الظاهرة بالإضافة إلى عضلات التثبيت العميقة والعضلات المائلة.",
    },
    headNames: ["rectus abdominis", "obliques"],
    headNames_ar: ["العضلة المستقيمة البطنية", "العضلات المائلة"],
    heads: [
      {
        id: 1,
        name: "Abdominals",
        name_ar: " المعدة المتوسطة",
        description:
          "The classic 'six-pack' muscle. It flexes the spine and brings the pelvis toward the chest.",
        description_ar:
          "عضلة 'السيكس باك' الكلاسيكية. تقوم بثني العمود الفقري وتقرب الحوض نحو الصدر , ينم التركيز عليها بتمارين المعدة من رفع للجذع او للقدمين.",
        image: abdominalAbsImg,
      },
      {
        id: 2,
        name: "Obliques",
        name_ar: "المعدة الجانبية ",
        description:
          "Located on the sides of the torso. Responsible for rotation and lateral flexion of the spine.",
        description_ar:
          " تقع على جانبي الجذع. مسؤولة عن دوران وانثناء العمود الفقري جانبياً , يتم التركيز عليها بتمارين المعدة مع الالتفات للجهتنين , البلانك الجانبي.",
        image: obliquesAbsImg,
      },
    ],
  },
  forearms: {
    pageHeader: {
      plainTitle: "Forearms",
      plainTitle_ar: "عضلات",
      highlightedTitle: "Muscle",
      highlightedTitle_ar: "الساعدين",
      body: "the needed knowledge to build strong, defined forearms",
      body_ar: "المعرفة اللازمة لبناء ساعدين قويين محددين",
      image: forearmsCover,
    },
    sectionHeader: {
      plainTitle: "Forearms",
      plainTitle_ar: "الساعدين",
      highlightedTitle: "Anatomy",
      highlightedTitle_ar: "التشريح",
      body: "The forearms have three heads: flexors (palm side), extensors (back of hand side), and brachioradialis (thumb side).",
      body_ar:
        'يحتوي الساعد على ثلاثة رؤوس: الامامي (جهة راحة اليد)، الخلفي (جهة ظهر اليد)، و "البراكيرادياليس" (جهة الإبهام).',
      note: "the forearms are involved in almost every upper body exercise. So you might see people ignoring training them , but it is preferable to include one forearms exercise in your routine.",
      note_ar:
        "الساعدان يشاركان في كل تمرين للجزء العلوي من الجسم تقريباً. قد ترى أشخاصاً يتجاهلون تدريبهم، لكن من الأفضل تضمين تمرين واحد للساعدين في روتينك.",
    },
    headNames: ["flexors", "extensors", "brachioradialis"],
    headNames_ar: ["البراكيرادياليس", "الخلفي", "الامامي"],
    heads: [
      {
        id: 1,
        name: "Flexors (Palm Side)",
        name_ar: "الامامي",
        description:
          "The wrist flexors is one of the biggest muscles in the forearm. It is mostly activated by wrist curls.",
        description_ar:
          "الساعد الامامي هو واحد من أكبر العضلات في الساعد. يتم التركيز عليه بشكل أساسي بتمارين شد المعصم.",
        image: flexorsForearmsImg,
      },
      {
        id: 2,
        name: "Extensors (Back of Hand)",
        name_ar: "الخلفي",
        description:
          "The extensors bend your wrist back. They are mostly activated by reverse wrist curls.",
        description_ar:
          " الساعد العكسي بثني المعصم للخلف. يتم التركيز عليه بشكل أساسي بتمارين شد المعصم العكسي.",
        image: extensorsForearmsImg,
      },
      {
        id: 3,
        name: "Brachioradialis (Thumb Side)",
        name_ar: "البراكيرادياليس",
        description:
          "The brachioradialis adds thickness to the upper forearm. It is mostly activated by reverse curls.",
        description_ar:
          "البراكيرادياليس  تزيد من سمك الجزء العلوي من الساعد. وهي امتداد لعضلة البراكياليس في البايسبس , يتم التركيز عليها بشكل أساسي بتمارين التبادل العكسي.",
        image: brachioForearmsImg,
      },
    ],
  },
};
