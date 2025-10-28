import React from "react";

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-white/80 shadow rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-3 bg-slate-200 rounded w-1/6"></div>
          </div>
          <div className="h-3 bg-slate-200 rounded w-2/3 mb-2"></div>
          <div className="h-12 bg-slate-200 rounded w-full"></div>
        </div>
      ))}
    </>
  );
}