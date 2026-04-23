import Card from "../components/Card";
import Header from "../components/Header";
const tipsContent = [
  {
    tag: "NUTRITION",
    title: "The Anabolic Window Myth",
    body: "Total daily protein intake outweighs the timing of your post-workout shake. Focus on 1.6g-2.2g/kg bodyweight.",
    icon: "bolt",
    metricLabel: "Success Rate",
    metricValue: 94,
    links: [
      { label: "Read Study", url: "https://example.com/protein-study" },
      { label: "Protein Calc", url: "https://example.com/calculator" },
    ],
  },
  {
    tag: "FORM",
    title: "The 2-Second Negative",
    body: "Maximize hypertrophy by controlling the eccentric phase for increased time under tension.",
    icon: "timer",
    metricLabel: "Efficiency",
    metricValue: 88,
    links: [
      { label: "Watch Form", url: "https://youtube.com/eccentric-guide" },
    ],
  },
  {
    tag: "RECOVERY",
    title: "Magnesium Glycinate",
    body: "Improve CNS recovery and deep sleep cycles. Glycinate offers superior absorption.",
    icon: "Nightlight",
    metricLabel: "Recovery Delta",
    metricValue: 72,
    links: [
      { label: "Dosage Guide", url: "https://example.com/magnesium" },
      { label: "Deep Sleep Protocol", url: "https://example.com/recovery" },
    ],
  },
  {
    tag: "NUTRITION",
    title: "The Anabolic Window Myth",
    body: "Total daily protein intake outweighs the timing of your post-workout shake. Focus on 1.6g-2.2g/kg bodyweight.",
    icon: "bolt",
    metricLabel: "Success Rate",
    metricValue: 94,
    links: [
      { label: "Read Study", url: "https://example.com/protein-study" },
      { label: "Protein Calc", url: "https://example.com/calculator" },
    ],
  },
  {
    tag: "FORM",
    title: "The 2-Second Negative",
    body: "Maximize hypertrophy by controlling the eccentric phase for increased time under tension.",
    icon: "timer",
    metricLabel: "Efficiency",
    metricValue: 88,
    links: [
      { label: "Watch Form", url: "https://youtube.com/eccentric-guide" },
    ],
  },
  {
    tag: "RECOVERY",
    title: "Magnesium Glycinate",
    body: "Improve CNS recovery and deep sleep cycles. Glycinate offers superior absorption.",
    icon: "Nightlight",
    metricLabel: "Recovery Delta",
    metricValue: 72,
    links: [
      { label: "Dosage Guide", url: "https://example.com/magnesium" },
      { label: "Deep Sleep Protocol", url: "https://example.com/recovery" },
    ],
  },
];
const layoutMap = [
  "md:col-span-2", // 0: The Anchor (Wide Left)
  "md:col-span-1", // 1: Technical Detail
  "md:col-span-1", // 2: Technical Detail
  "md:col-span-1", // 3: Technical Detail
  "md:col-span-1", // 4: Technical Detail
  "md:col-span-2", // 5: The Mid-Point Feature (Wide Right)
  "md:col-span-1", // 6: Final Technical Spec
];
const Tips = () => (
  <>
    <Header
      className="mb-16"
      pageHeader={true}
      plainTitle="EXERCISES"
      highlightTitle="LIBRARY"
      subTitle="Optimize Every Rep"
      body="Scientific progression starts with technical mastery. Select a target area to initialize protocols."
      image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
      titleSize="text-5xl md:text-7xl"
      bodyClassName="max-w-[280px]"
    />

    <FilterBar />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-flow-row-dense">
      {tipsContent.map((tip, i) => (
        <Card
          key={i}
          tag={`[ ${tip.tag} ]`}
          title={tip.title}
          body={tip.body}
          icon={tip.icon}
          className={`${layoutMap[i % layoutMap.length]} flex flex-col h-full`}
          links={tip.links}
        >
          {/* Technical Footer */}
          <div className="mt-auto pt-10">
            {/* <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] text-zinc-400 font-mono uppercase">
                  {tip.metricLabel}
                </span>
                <span className="text-xs text-[#0070FF] font-mono font-bold">
                  {tip.metricValue}%
                </span>
              </div> */}

            {/* <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0070FF] shadow-[0_0_15px_rgba(0,112,255,0.8)]"
                  style={{ width: `${tip.metricValue}%` }}
                />
              </div> */}
          </div>
        </Card>
      ))}
    </div>

    {/* Bottom spacing for mobile visibility */}
    <div className="h-20 md:hidden" />
  </>
);

export default Tips;

const FilterBar = ({ activeFilter, setActiveFilter }) => {
  const filters = ["All", "Exercises", "Splits", "Nutrition", "Mindset"];

  return (
    <div className="sticky top-16 z-30 w-full bg-[#131313]/80 backdrop-blur-md border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-3 md:px-0 py-6 scroll-smooth">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 uppercase tracking-wider whitespace-nowrap ${
                  isActive
                    ? "border-[#0070FF] text-[#0070FF] bg-[#0070FF]/10 shadow-[0_0_15px_rgba(0,112,255,0.1)]"
                    : "border-white/10 text-zinc-400 hover:border-[#0070FF]/40 hover:text-zinc-200"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
