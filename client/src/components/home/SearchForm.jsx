import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCities } from '../../services/busService';
import { localDateInputValue } from '../../utils/formatters';

export default function SearchForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: localDateInputValue(),
    passengers: '1'
  });
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) setShowFromDropdown(false);
      if (toRef.current && !toRef.current.contains(e.target)) setShowToDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySearch = async (query, field) => {
    if (query.length < 2) {
      field === 'from' ? setFromSuggestions([]) : setToSuggestions([]);
      return;
    }
    try {
      const res = await searchCities(query);
      const cities = res.data || res || [];
      if (field === 'from') {
        setFromSuggestions(cities);
        setShowFromDropdown(true);
      } else {
        setToSuggestions(cities);
        setShowToDropdown(true);
      }
    } catch (err) {
      console.error('City search failed:', err);
    }
  };

  const selectCity = (city, field) => {
    setFormData(prev => ({ ...prev, [field]: city.name }));
    if (field === 'from') { setShowFromDropdown(false); setFromSuggestions([]); }
    else { setShowToDropdown(false); setToSuggestions([]); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.date) return;
    navigate(`/search?from=${encodeURIComponent(formData.from)}&to=${encodeURIComponent(formData.to)}&date=${formData.date}&passengers=${formData.passengers}`);
  };

  return (
    <section className="w-full py-2 px-gutter">
      <div className="max-w-[1200px] mx-auto">
        <div className="w-full bg-white rounded-xl border border-[#E6E6E1] p-5 md:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 items-end">
            {/* From */}
            <div className="lg:col-span-3 flex flex-col gap-1.5" ref={fromRef}>
              <label className="font-label-sm text-label-sm uppercase tracking-wider text-[#6B6B67] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#315C4B]">trip_origin</span>
                From
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Leaving from..."
                  value={formData.from}
                  onChange={(e) => {
                    setFormData({ ...formData, from: e.target.value });
                    handleCitySearch(e.target.value, 'from');
                  }}
                  onFocus={() => formData.from.length >= 2 && setShowFromDropdown(true)}
                  className="w-full h-12 px-3.5 bg-white border border-[#E6E6E1] rounded-lg font-body-md text-body-md text-[#171717] focus:outline-none focus:border-[#315C4B] transition-colors"
                  required
                />
                {showFromDropdown && fromSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E6E6E1] rounded-lg z-50 max-h-48 overflow-y-auto">
                    {fromSuggestions.map((city) => (
                      <button
                        key={city._id}
                        type="button"
                        onClick={() => selectCity(city, 'from')}
                        className="w-full text-left px-4 py-3 hover:bg-[#F7F7F5] transition-colors border-b border-[#E6E6E1] last:border-0"
                      >
                        <span className="font-label-md text-label-md text-[#171717] font-semibold">{city.name}</span>
                        <span className="font-body-sm text-body-sm text-[#6B6B67] ml-2">{city.state}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* To */}
            <div className="lg:col-span-3 flex flex-col gap-1.5" ref={toRef}>
              <label className="font-label-sm text-label-sm uppercase tracking-wider text-[#6B6B67] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#315C4B]">location_on</span>
                To
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Going to..."
                  value={formData.to}
                  onChange={(e) => {
                    setFormData({ ...formData, to: e.target.value });
                    handleCitySearch(e.target.value, 'to');
                  }}
                  onFocus={() => formData.to.length >= 2 && setShowToDropdown(true)}
                  className="w-full h-12 px-3.5 bg-white border border-[#E6E6E1] rounded-lg font-body-md text-body-md text-[#171717] focus:outline-none focus:border-[#315C4B] transition-colors"
                  required
                />
                {showToDropdown && toSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E6E6E1] rounded-lg z-50 max-h-48 overflow-y-auto">
                    {toSuggestions.map((city) => (
                      <button
                        key={city._id}
                        type="button"
                        onClick={() => selectCity(city, 'to')}
                        className="w-full text-left px-4 py-3 hover:bg-[#F7F7F5] transition-colors border-b border-[#E6E6E1] last:border-0"
                      >
                        <span className="font-label-md text-label-md text-[#171717] font-semibold">{city.name}</span>
                        <span className="font-body-sm text-body-sm text-[#6B6B67] ml-2">{city.state}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date */}
            <div className="lg:col-span-2 flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm uppercase tracking-wider text-[#6B6B67] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#315C4B]">calendar_today</span>
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                min={localDateInputValue()}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full h-12 px-3.5 bg-white border border-[#E6E6E1] rounded-lg font-body-md text-body-md text-[#171717] focus:outline-none focus:border-[#315C4B] transition-colors"
                required
              />
            </div>

            {/* Passengers */}
            <div className="lg:col-span-2 flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm uppercase tracking-wider text-[#6B6B67] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#315C4B]">group</span>
                Passengers
              </label>
              <select
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                className="w-full h-12 px-3.5 bg-white border border-[#E6E6E1] rounded-lg font-body-md text-body-md text-[#171717] focus:outline-none focus:border-[#315C4B] transition-colors appearance-none cursor-pointer"
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4+ Passengers</option>
              </select>
            </div>

            {/* Search */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full h-12 bg-[#315C4B] hover:bg-[#234F3E] text-white rounded-lg font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Search Buses</span>
              </button>
            </div>
          </form>

          {/* Quality Signals */}
          <div className="mt-5 pt-4 border-t border-[#E6E6E1] flex flex-wrap items-center justify-between gap-3 text-[#6B6B67]">
            <div className="flex items-center gap-2 font-body-sm text-body-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315C4B]"></span>
              <span>Demo schedules across India</span>
            </div>
            <div className="flex items-center gap-2 font-body-sm text-body-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315C4B]"></span>
              <span>Simulated trip tracking for each booking</span>
            </div>
            <div className="flex items-center gap-2 font-body-sm text-body-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315C4B]"></span>
              <span>Simple sample fares for this college demo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
