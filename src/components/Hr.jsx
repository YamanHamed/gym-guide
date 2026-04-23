const Hr = ({ label, className = "", py = "py-10" }) => {
  return (
    <div className={`max-w-7xl mx-auto relative ${className}`}>
      {label ? (
        /* Variant 1: Label with Left-Aligned Gradient */
        <div className={`max-w-7xl mx-auto  mt-20 mb-10 relative ${py}`}>
          <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent"></div>

          <div className="absolute top-1/2 left-8 -translate-y-1/2 pr-12 flex items-center group">
            <span className=" bg-background px-2 relative z-10 text-lg md:text-xl font-black uppercase  hover:text-white transition-colors duration-500  select-none italic">
              {label}
            </span>
          </div>
        </div>
      ) : (
        /* Variant 2: Clean Centered Gradient */
        <div className={`px-8  ${py}`}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default Hr;
