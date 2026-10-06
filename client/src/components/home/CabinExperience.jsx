import React from 'react';

export default function CabinExperience() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center py-20 px-6">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxT9cD__iYBhtOALm0Wsjn0Xtn6RSc7yAlqB091bANAGEbPGs1RRNBAVo9GOtSRYzjQw9Cd2aHzEc4y8V6WvjyhHqkX_tHaCrHe5p5LEEZM1tgyQHBXBXtUJoguaZateAfwoJimQ-sC3dJA0oZ5ZfrxNDs2IlxwlrY2hZFZWtKKfaMlfSlzAoewuj9k9v0VpSppEbI8fCAA0_rTrVr9vAuRb69I7NIq84elz5Sb1hGgrC0rWHXDtH3Tw" 
          alt="Bus Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/90 to-[#171717]/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Onboard Environment
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Comfort that goes with you.</h2>
          <p className="text-[#E6E6E1] text-lg leading-relaxed mb-8">
            Every GoRide vehicle is designed around passenger wellbeing. Enjoy superior legroom, individualized climate control, and a whisper-quiet ride.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#315C4B]">wb_sunny</span>
              <span className="text-sm font-medium">Panoramic UV Windows</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#315C4B]">event_seat</span>
              <span className="text-sm font-medium">Ergonomic 2+2 Seating</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#315C4B]">airline_seat_recline_extra</span>
              <span className="text-sm font-medium">Individual Air Suspensions</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#315C4B]">air</span>
              <span className="text-sm font-medium">Onboard Air Purification</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
