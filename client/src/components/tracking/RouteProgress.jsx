import React from 'react';

export default function RouteProgress({ stops, currentStopIndex, progress }) {
  return (
    <div className="relative pl-6 space-y-8 py-2">
      {/* Vertical line connecting nodes */}
      <div className="absolute top-4 bottom-4 left-[11px] w-0.5 bg-[#E6E6E1] z-0"></div>
      
      {/* Filled progress line */}
      <div 
        className="absolute top-4 left-[11px] w-0.5 bg-[#315C4B] z-0 transition-all duration-1000 ease-linear"
        style={{ height: `${Math.min(100, (currentStopIndex / (stops.length - 1)) * 100)}%` }}
      ></div>

      {stops.map((stop, idx) => {
        const isCompleted = idx < currentStopIndex || progress >= 100;
        const isCurrent = idx === currentStopIndex && progress < 100;
        
        return (
          <div key={idx} className="relative z-10 flex items-start gap-4">
            <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center -ml-[30px] border-2 transition-colors ${
              isCompleted ? 'bg-[#315C4B] border-[#315C4B] text-white' : 
              isCurrent ? 'bg-white border-[#315C4B]' : 
              'bg-white border-[#E6E6E1]'
            }`}>
              {isCompleted ? (
                <span className="material-symbols-outlined text-[14px]">check</span>
              ) : isCurrent ? (
                <div className="w-2 h-2 rounded-full bg-[#315C4B] animate-pulse"></div>
              ) : null}
            </div>
            
            <div>
              <p className={`text-sm font-bold ${isCompleted || isCurrent ? 'text-[#171717]' : 'text-[#6B6B67]'}`}>
                {stop.name}
              </p>
              <p className="text-xs text-[#6B6B67] mt-0.5">{stop.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
