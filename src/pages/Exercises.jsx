import Header from "../components/Header";
import Hr from "../components/Hr";
import Card from "../components/Card";
// import cover from "../imgs/muscular-triceps.webp";

const Exercises = () => {
  return (
    <div>
      <Header
        className="mb-16"
        pageHeader={true}
        plainTitle="TRICEPS"
        highlightTitle="BRACHII"
        subTitle="Primary Elbow Extensor"
        body="Targeted development of the long, lateral, and medial heads through varied shoulder positions and mechanical tension."
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
        imageClassName="opacity-30"
        titleSize="text-5xl md:text-7xl"
        bodyClassName="max-w-[280px]"
      />

      <Hr />
      <section>
        <Header
          className="mb-16"
          plainTitle="THEORY &"
          highlightTitle="SYNERGY"
          subTitle="One Goal, Multiple Paths"
          body="Hypertrophy is a result of total weekly volume. Whether you hit a muscle once, twice, or three times a week, the physiological destination is the same."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Card
            rounded="rounded-2xl"
            type="top-image"
            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGYlMjB1cHBlciUyMGxvd2VyJTIwc2VjdGlvbnnwZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" // Or your image path
            title="Lat Pull Down"
            body="Focus on high-threshold motor unit recruitment. Prioritize mechanical tension and strict tempo control throughout the eccentric phase."
            links={[
              { label: "Technique Guide", url: "https://youtube.com/..." },
              { label: "Execution Protocol", url: "/protocols/lats" },
            ]}
          />
          <Card
            rounded="rounded-2xl"
            type="top-image"
            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGYlMjB1cHBlciUyMGxvd2VyJTIwc2VjdGlvbnnwZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" // Or your image path
            title="Lat Pull Down"
            body="Focus on high-threshold motor unit recruitment. Prioritize mechanical tension and strict tempo control throughout the eccentric phase."
            links={[
              { label: "Technique Guide", url: "https://youtube.com/..." },
              { label: "Execution Protocol", url: "/protocols/lats" },
            ]}
          />
          <Card
            rounded="rounded-2xl"
            type="top-image"
            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGYlMjB1cHBlciUyMGxvd2VyJTIwc2VjdGlvbnnwZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" // Or your image path
            title="Lat Pull Down"
            body="Focus on high-threshold motor unit recruitment. Prioritize mechanical tension and strict tempo control throughout the eccentric phase."
            links={[
              { label: "Technique Guide", url: "https://youtube.com/..." },
              { label: "Execution Protocol", url: "/protocols/lats" },
            ]}
          />
        </div>
      </section>
      <Hr />

      <section>
        <Header
          className="mb-16"
          plainTitle="THEORY &"
          highlightTitle="SYNERGY"
          subTitle="One Goal, Multiple Paths"
          body="Hypertrophy is a result of total weekly volume. Whether you hit a muscle once, twice, or three times a week, the physiological destination is the same."
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-12">
          <Card
            links={[
              { label: "Long Head Mechanics", url: "#" },
              { label: "Shoulder  Study", url: "#" },
              { label: " Position Study", url: "#" },
            ]}
            type="side-image"
            title="Lat Pull Down"
            tag="Hypertrophy"
            body="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGYlMjB1cHBlciUyMGxvd2VyJTIwc2VjdGlvbnnwZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            rounded="rounded-2xl"
          />

          <Card
            links={[
              { label: "Long Head Mechanics", url: "#" },
              { label: "Shoulder  Study", url: "#" },
              { label: " Position Study", url: "#" },
            ]}
            type="side-image"
            title="Lat Pull Down"
            tag="Hypertrophy"
            body="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGYlMjB1cHBlciUyMGxvd2VyJTIwc2VjdGlvbnnwZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            rounded="rounded-2xl"
          />
        </div>
      </section>

      <Hr className="mt-32" />
    </div>
  );
};

export default Exercises;

const ExerciseCard = ({ exercise }) => {
  // Safe handling of links in case none are provided
  const links = exercise.links || [];

  return (
    <article className="exercise-article glass-vault rounded-3xl overflow-hidden transition-all duration-500 group cursor-pointer relative">
      {/* 1. Exercise Preview (Image + Corner Tags) */}
      <div className="aspect-video w-full overflow-hidden bg-surface-container-low relative">
        {/* <img
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          src={
            exercise.image ||
            "https://images.example.com/placeholder-exercise.jpg"
          }
        /> */}

        {/* User request: Position Tags in the Top Left Corner */}
        {/* We use 'z-20' and 'pointer-events-none' to ensure they sit above the vignette and don't intercept clicks */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-none">
          {exercise.tags &&
            exercise.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-[10px] font-bold tracking-widest rounded-full uppercase ${
                  tag.primary
                    ? "border border-blue-500/30 text-blue-400"
                    : "border border-outline-variant text-secondary"
                }`}
              >
                {tag.label}
              </span>
            ))}
        </div>

        {/* Technical vignettes for dark UI integration (bottom vignette helps title) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/70 via-transparent to-[#131313]/20 pointer-events-none z-10"></div>
        {/* Blue Technical Accent */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#0070FF]/30 to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* 2. Content Section */}
      <div className="p-8">
        <h2 className="text-2xl font-black text-white mb-3 tracking-tight">
          {exercise.name}
        </h2>

        {exercise.description && (
          <p className="text-secondary/70 text-sm leading-relaxed mb-8 line-clamp-2 italic">
            {exercise.description}
          </p>
        )}

        {/* External Links Section */}
        {links.length > 0 && (
          <div className="pt-6 border-t border-white/5">
            <h3 className="text-[10px] font-black tracking-[0.2em] text-zinc-500 mb-4 uppercase">
              EXTERNAL RESOURCES
            </h3>
            <div className="flex gap-4 flex-wrap">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#0070FF]/20 rounded-xl transition-colors text-xs font-semibold group/link"
                >
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon={link.icon}
                  >
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
