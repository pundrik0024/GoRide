import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrackingPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-[#171717] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#313030] border border-[#404040] rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            <div className="w-2 h-2 rounded-full bg-[#315C4B] animate-pulse"></div>
            Demo trip preview
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">A clear view of your trip.</h2>
          <p className="text-[#A3A3A3] text-lg leading-relaxed mb-8">
            Follow a simulated trip timeline connected to a booking. This college demo does not use live GPS or real operator data.
          </p>

          <div className="bg-[#262626] border border-[#404040] rounded-2xl p-6 mb-8 max-w-md">
            <div className="flex justify-between items-center mb-6 border-b border-[#404040] pb-4">
              <div>
                <p className="text-sm font-bold">Jaipur → Delhi</p>
                <p className="text-xs text-[#A3A3A3]">Fictional demo service</p>
              </div>
              <div className="px-3 py-1 bg-[#315C4B]/20 text-[#315C4B] rounded-full text-xs font-bold">
                ON TIME
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-[#A3A3A3] mb-1">Progress</p>
                <p className="text-lg font-mono">Simulated</p>
              </div>
              <div>
                <p className="text-xs text-[#A3A3A3] mb-1">ETA Delhi</p>
                <p className="text-lg font-mono">14:30</p>
              </div>
              <div>
                <p className="text-xs text-[#A3A3A3] mb-1">Next Stop</p>
                <p className="text-lg font-mono truncate">Gurugram</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/my-bookings')}
            className="px-6 py-3 bg-white text-[#171717] rounded-lg font-medium hover:bg-[#E6E6E1] transition-colors"
          >
            Track a Bus
          </button>
        </div>

        <div className="relative h-[400px] w-full bg-[#262626] rounded-2xl border border-[#404040] p-8 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 400 300" className="w-full h-full stroke-[#404040] fill-none">
            <path d="M 50 250 C 100 250, 150 150, 200 150 S 300 100, 350 50" strokeWidth="4" strokeLinecap="round"/>
            <path d="M 50 250 C 100 250, 150 150, 200 150" stroke="#315C4B" strokeWidth="4" strokeLinecap="round" className="animate-[dash_3s_linear_infinite]" strokeDasharray="10 10"/>
            
            {/* Waypoints */}
            <circle cx="50" cy="250" r="6" fill="#171717" stroke="#315C4B" strokeWidth="3"/>
            <text x="50" y="270" fill="#A3A3A3" fontSize="12" textAnchor="middle" stroke="none">Jaipur</text>
            
            <circle cx="150" cy="180" r="4" fill="#404040" stroke="none"/>
            <text x="160" y="185" fill="#6B6B67" fontSize="10" stroke="none">Kotputli</text>
            
            <circle cx="280" cy="115" r="4" fill="#404040" stroke="none"/>
            <text x="290" y="120" fill="#6B6B67" fontSize="10" stroke="none">Gurugram</text>

            <circle cx="350" cy="50" r="6" fill="#171717" stroke="#404040" strokeWidth="3"/>
            <text x="350" y="35" fill="#A3A3A3" fontSize="12" textAnchor="middle" stroke="none">Delhi</text>

            {/* Bus Marker */}
            <g transform="translate(200, 150)">
              <circle cx="0" cy="0" r="16" fill="#315C4B" className="animate-pulse opacity-20"/>
              <circle cx="0" cy="0" r="8" fill="#315C4B" stroke="#171717" strokeWidth="2"/>
            </g>
          </svg>
          <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-mono text-[#A3A3A3]">
            <span className="material-symbols-outlined text-[14px]">satellite_alt</span>
            Demo tracking
          </div>
        </div>
      </div>
    </section>
  );
}
