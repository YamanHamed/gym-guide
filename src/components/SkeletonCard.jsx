import React from "react";

const SkeletonCard = ({ className }) => {
  return (
    <div
      className={`bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse ${className}`}
    >
      {/* <div className="w-10 h-10 bg-white/10 rounded-full mb-4"></div> */}
      <div className="h-4 bg-white/10 rounded w-20 mb-3"></div>
      <div className="h-6 bg-white/10 rounded w-3/4 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-6 bg-white/10 rounded w-16"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
