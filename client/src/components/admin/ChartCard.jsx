import React from 'react';

export default function ChartCard({ title, children }) {
  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl p-6 h-full flex flex-col">
      <h3 className="text-sm font-bold text-[#171717] mb-6">{title}</h3>
      <div className="flex-1 w-full relative min-h-[300px]">
        {children}
      </div>
    </div>
  );
}
