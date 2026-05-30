import React from "react";

const ErrorTag = ({
  error,
  onRetry,
  showRefresh = true,
  type = "big", // "big" or "small"
  severity = "info", // default is now "info" (brand blue)
}) => {
  const handleRefresh = () => {
    if (onRetry) onRetry();
    else window.location.reload();
  };

  const colors = {
    error: {
      bg: "bg-red-500/5",
      border: "border-red-500/30",
      text: "text-red-300",
      icon: "error",
      buttonHover: "hover:bg-red-500/20",
    },
    warning: {
      bg: "bg-amber-500/5",
      border: "border-amber-500/30",
      text: "text-amber-300/90",
      icon: "warning",
      buttonHover: "hover:bg-amber-500/20",
    },
    info: {
      bg: "bg-[#0070FF]/5",
      border: "border-[#0070FF]/30",
      text: "text-[#0070FF]/90",
      icon: "info",
      buttonHover: "hover:bg-[#0070FF]/20",
    },
  };

  const style = colors[severity] || colors.info;

  if (type === "small") {
    return (
      <div className={`flex items-center gap-2 ${style.text} text-sm mt-2`}>
        <span className="material-symbols-outlined text-base">
          {style.icon}
        </span>
        <span>{error || "Something went wrong"}</span>
        {showRefresh && (
          <button
            onClick={handleRefresh}
            className="ml-auto text-xs underline hover:no-underline"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-8 rounded-2xl ${style.bg} ${style.border} text-center max-w-md mx-auto my-8`}
    >
      <div className={style.text}>
        <span className="material-symbols-outlined text-3xl">{style.icon}</span>
      </div>
      <p className={`${style.text} font-medium`}>
        {error || "Something went wrong"}
      </p>
      {showRefresh && (
        <button
          onClick={handleRefresh}
          className={`px-5 py-2 rounded-lg bg-white/5 ${style.buttonHover} ${style.text} text-sm font-semibold transition-colors duration-200 flex items-center gap-2`}
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorTag;
