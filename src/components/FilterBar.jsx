const FilterBar = ({
  filters = [], // array of { value, label }
  value = [], // array of selected values (strings)
  onChange, // called with new array of values
  className = "",
}) => {
  const allValue = filters[0]?.value; // first filter's value acts as "All"

  const handleToggle = (filterValue) => {
    let newSelection;

    if (filterValue === allValue) {
      newSelection = [allValue];
    } else {
      if (value.includes(filterValue)) {
        newSelection = value.filter((v) => v !== filterValue);
      } else {
        newSelection = [...value, filterValue];
      }
      if (newSelection.length === 0) newSelection = [allValue];
      if (newSelection.includes(allValue) && newSelection.length > 1) {
        newSelection = newSelection.filter((v) => v !== allValue);
      }
    }
    onChange(newSelection);
  };

  return (
    <div
      className={`sticky top-16 z-30 w-full bg-[#131313] border-b border-white/5 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-3 md:px-0 py-6 scroll-smooth">
          {filters.map((filter) => {
            const isChecked = value.includes(filter.value);
            return (
              <label
                key={filter.value}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 uppercase tracking-wider whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isChecked
                    ? "border-[#0070FF] text-[#0070FF] bg-[#0070FF]/10 shadow-[0_0_15px_rgba(0,112,255,0.1)]"
                    : "border-white/10 text-zinc-400 hover:border-[#0070FF]/40 hover:text-zinc-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isChecked}
                  onChange={() => handleToggle(filter.value)}
                />
                {filter.label}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
