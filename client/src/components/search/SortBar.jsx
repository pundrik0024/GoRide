import React from 'react';
import Chip from '../ui/Chip';

export default function SortBar({ activeSort, onSortChange, resultsCount }) {
  const sortOptions = [
    'Recommended',
    'Price: Low to High',
    'Price: High to Low',
    'Earliest Departure',
    'Shortest Duration'
  ];

  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm font-medium text-[#6B6B67]">
        <span className="font-bold text-[#171717]">{resultsCount}</span> buses found
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-[#6B6B67] mr-2">Sort by:</span>
        {sortOptions.map(option => (
          <Chip 
            key={option}
            active={activeSort === option}
            onClick={() => onSortChange(option)}
          >
            {option}
          </Chip>
        ))}
      </div>
    </div>
  );
}
