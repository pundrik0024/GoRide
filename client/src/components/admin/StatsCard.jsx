import React from 'react';

export default function StatsCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#171717]">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {trend && (
          <div className={`text-xs font-bold flex items-center gap-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span className="material-symbols-outlined text-[14px]">
              {trend > 0 ? 'trending_up' : 'trending_down'}
            </span>
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-[#6B6B67] mb-1">{title}</p>
      <p className="text-3xl font-bold text-[#171717]">{value}</p>
    </div>
  );
}
