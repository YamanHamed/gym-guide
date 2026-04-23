const QuickLink = ({
  label = "",
  icon = "keyboard_double_arrow_down",
  align = "end",
  onClick,
  href,
  targetRef, // New prop for scrolling
  className = "",
}) => {
  const alignmentStyles = {
    start:
      "justify-center md:justify-start items-center md:items-start text-center md:text-left",
    center: "justify-center items-center text-center",
    end: "justify-center md:justify-end items-center md:items-end text-center md:text-right",
  };

  // Internal scroll handler
  const handleScroll = (e) => {
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Still call onClick if provided (for analytics or other logic)
    if (onClick) onClick(e);
  };

  const Content = (
    <div
      className={`flex flex-col gap-2 ${alignmentStyles[align]} ${className}`}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 mb-1">
        {label}
      </span>
      <span
        className="up-and-down material-symbols-outlined notranslate text-primary-container select-none"
        style={{ fontWeight: "bold", fontSize: "2.5rem" }}
      >
        {icon}
      </span>
    </div>
  );

  return (
    <div className={`flex w-full mt-10  ${alignmentStyles[align]}`}>
      {href ? (
        <a href={href} className="cursor-pointer no-underline">
          {Content}
        </a>
      ) : (
        <button
          // If we have a targetRef, use handleScroll, otherwise use onClick
          onClick={targetRef ? handleScroll : onClick}
          className="cursor-pointer bg-transparent border-none p-0 focus:outline-none"
        >
          {Content}
        </button>
      )}
    </div>
  );
};

export default QuickLink;
