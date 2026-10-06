import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClosingBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 border-t border-[#E6E6E1] bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#171717] mb-6">Experience dependable intercity transit.</h2>
        <p className="text-[#6B6B67] text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of daily commuters choosing comfort, reliability, and sustainability.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => navigate('/search')}
            className="px-8 py-4 bg-[#315C4B] text-white rounded-lg font-bold hover:bg-[#234F3E] transition-colors"
          >
            Book Your Route
          </button>
          <button 
            className="px-8 py-4 bg-white text-[#171717] border border-[#E6E6E1] rounded-lg font-bold hover:border-[#171717] transition-colors"
          >
            View Fleet Specifications
          </button>
        </div>
      </div>
    </section>
  );
}
