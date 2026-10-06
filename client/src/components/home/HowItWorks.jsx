import React from 'react';

export default function HowItWorks() {
  const steps = [
    { num: '01', icon: 'search', title: 'Search', desc: 'Enter your departure and arrival cities along with your travel date.' },
    { num: '02', icon: 'check_circle', title: 'Select', desc: 'Choose a schedule that fits and pick your preferred seat.' },
    { num: '03', icon: 'payments', title: 'Book', desc: 'Complete payment securely using UPI, Card, or Net Banking.' },
    { num: '04', icon: 'luggage', title: 'Travel', desc: 'Board with your digital pass and enjoy the journey.' },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#171717] mb-4">How it works</h2>
        <p className="text-[#6B6B67] max-w-2xl mx-auto">Booking your intercity travel is simpler than ever.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-[#F7F7F5] border border-[#E6E6E1] rounded-2xl p-8 relative overflow-hidden group hover:border-[#171717] transition-colors">
            <div className="absolute -top-4 -right-4 text-8xl font-black text-[#E6E6E1]/50 select-none group-hover:text-[#315C4B]/10 transition-colors">
              {step.num}
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl border border-[#E6E6E1] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#315C4B]">{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-3">{step.title}</h3>
              <p className="text-sm text-[#6B6B67] leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
