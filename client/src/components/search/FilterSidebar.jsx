import React from 'react';

export default function FilterSidebar({ filters, setFilters }) {
  const handleCheckbox = (category, value) => {
    const current = filters[category] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setFilters({ ...filters, [category]: updated });
  };

  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-[#171717]">Filters</h3>
        <button 
          onClick={() => setFilters({ time: [], type: [], amenities: [], minPrice: '', maxPrice: '' })}
          className="text-xs font-medium text-[#315C4B] hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-bold text-[#171717] mb-3">Departure Time</h4>
        <div className="space-y-2">
          {['Before 6 AM', '6 AM - 12 PM', '12 PM - 6 PM', 'After 6 PM'].map(time => (
            <label key={time} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={(filters.time || []).includes(time)}
                onChange={() => handleCheckbox('time', time)}
                className="w-4 h-4 rounded border-[#E6E6E1] text-[#315C4B] focus:ring-[#315C4B]" 
              />
              <span className="text-sm text-[#6B6B67]">{time}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6 border-t border-[#E6E6E1] pt-6">
        <h4 className="text-sm font-bold text-[#171717] mb-3">Bus Type</h4>
        <div className="space-y-2">
          {['Electric AC Seater', 'AC Sleeper', 'AC Seater', 'Non-AC Seater'].map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={(filters.type || []).includes(type)}
                onChange={() => handleCheckbox('type', type)}
                className="w-4 h-4 rounded border-[#E6E6E1] text-[#315C4B] focus:ring-[#315C4B]" 
              />
              <span className="text-sm text-[#6B6B67]">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6 border-t border-[#E6E6E1] pt-6">
        <h4 className="text-sm font-bold text-[#171717] mb-3">Amenities</h4>
        <div className="space-y-2">
          {['WiFi', 'Charging Port', 'AC', 'Blanket', 'Water Bottle'].map(amenity => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={(filters.amenities || []).includes(amenity)}
                onChange={() => handleCheckbox('amenities', amenity)}
                className="w-4 h-4 rounded border-[#E6E6E1] text-[#315C4B] focus:ring-[#315C4B]" 
              />
              <span className="text-sm text-[#6B6B67]">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
