const FilterBar = ({
  filters = [],
  value = [], // array of currently selected filters
  onChange, // called with new array
}) => {
  const handleToggle = (filter) => {
    let newSelection;
    if (filter === "All") {
      newSelection = ["All"];
    } else {
      if (value.includes(filter)) {
        newSelection = value.filter((f) => f !== filter);
      } else {
        newSelection = [...value, filter];
      }
      // If no filter is selected, reset to ["All"]
      if (newSelection.length === 0) newSelection = ["All"];
      // If "All" was previously selected and we add another, remove "All"
      if (newSelection.includes("All") && newSelection.length > 1) {
        newSelection = newSelection.filter((f) => f !== "All");
      }
    }
    onChange(newSelection);
  };

  return (
    <div className="sticky top-16 z-30 w-full bg-[#131313] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-3 md:px-0 py-6 scroll-smooth">
          {filters.map((filter) => {
            const isChecked = value.includes(filter);
            return (
              <label
                key={filter}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 uppercase tracking-wider whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isChecked
                    ? "border-[#0070FF] text-[#0070FF] bg-[#0070FF]/10 shadow-[0_0_15px_rgba(0,112,255,0.1)]"
                    : "border-white/10 text-zinc-400 hover:border-[#0070FF]/40 hover:text-zinc-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden" // hide native checkbox, we use custom styling
                  checked={isChecked}
                  onChange={() => handleToggle(filter)}
                />
                {filter}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
