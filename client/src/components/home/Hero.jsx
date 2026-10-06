import React from 'react';

export default function Hero() {
  return (
    <section className="bg-[#F7F7F5] pt-12 pb-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E6E6E1] rounded-full text-xs font-bold tracking-widest uppercase text-[#171717] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#315C4B]"></div>
            Intercity Travel
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-[#171717] leading-tight mb-6">
            Go further, <br/>comfortably.
          </h1>
          
          <p className="text-lg text-[#6B6B67] leading-relaxed mb-8">
            Experience premium intercity transit with reliable schedules, spacious ergonomic seating, and an expanding network across India.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 border border-[#E6E6E1] rounded-lg">
              <span className="material-symbols-outlined text-[#315C4B]">schedule</span>
              <span className="text-sm font-medium text-[#171717]">Fixed timetables</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 border border-[#E6E6E1] rounded-lg">
              <span className="material-symbols-outlined text-[#315C4B]">electric_car</span>
              <span className="text-sm font-medium text-[#171717]">100% Electric fleet</span>
            </div>
          </div>
        </div>

        <div className="relative h-[500px] rounded-2xl overflow-hidden border border-[#E6E6E1]">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMXp_bEwTkYk4EEnc9q_d4FZXKNFLbBUDVfk1UyC9wJW6JuxjelHwLrzLpnNb80sLOCBm-Z6X7XHvI0REY-T9mzNjLNHq83f7IFbsxaZ4XmDXePzyMkWx8P-ygPp8t_-G9oyG1uih5OsJwO-zmU9pf2q4q78xmO0uXgxEmUDK-8BcpqQQBO2OSb7JdDpAo45OoAmyX3fut-S7bezifwOwXmhULcKyyiyxWH4HyyXqxVIOpvKWdEVqeFg" 
            alt="Bus on highway"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/95 backdrop-blur rounded-xl p-4 border border-white/20 shadow-lg flex justify-between items-center">
              <div>
                <p className="text-xs text-[#6B6B67] font-medium uppercase tracking-wider mb-1">En Route</p>
                <p className="text-lg font-bold text-[#171717]">Jaipur — Delhi Express</p>
              </div>
              <div className="h-10 w-10 bg-[#315C4B] rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
