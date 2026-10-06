import React, { useState } from 'react';

export default function HelpPage() {
  const faqs = [
    { q: "How do I cancel my booking?", a: "You can cancel your booking from the 'My Bookings' section. Click on the ticket you wish to cancel and press the Cancel button. Refunds are processed according to our cancellation policy." },
    { q: "Do I need to print my ticket?", a: "No, a digital ticket on your phone is sufficient. You can access it via the app or your email confirmation." },
    { q: "How much luggage can I carry?", a: "Each passenger is allowed 1 check-in bag (up to 15kg) and 1 small personal item (up to 5kg) inside the cabin." },
    { q: "Where can I track my bus?", a: "You can use the 'Track Bus' feature on our website or app by entering your Booking ID." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-[#F7F7F5] min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#171717] mb-4 text-center">Help Center</h1>
        <p className="text-[#6B6B67] text-center mb-12">How can we assist you today?</p>

        <div className="bg-white border border-[#E6E6E1] rounded-2xl overflow-hidden mb-12">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-[#E6E6E1] last:border-b-0">
              <button 
                className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-[#171717] hover:bg-[#F7F7F5] transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.q}
                <span className="material-symbols-outlined text-[#6B6B67]">
                  {openIndex === idx ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5 text-[#6B6B67] text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E6E6E1] rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-4xl text-[#315C4B] mb-4">mail</span>
            <h3 className="font-bold text-[#171717] mb-2">Email Support</h3>
            <p className="text-[#6B6B67] text-sm mb-4">We usually reply within 24 hours.</p>
            <a href="mailto:support@goride.com" className="text-[#315C4B] font-bold hover:underline">support@goride.com</a>
          </div>
          
          <div className="bg-white border border-[#E6E6E1] rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-4xl text-[#315C4B] mb-4">call</span>
            <h3 className="font-bold text-[#171717] mb-2">Call Us</h3>
            <p className="text-[#6B6B67] text-sm mb-4">Available 24/7 for urgent queries.</p>
            <a href="tel:+9118001234567" className="text-[#315C4B] font-bold hover:underline">1800 123 4567</a>
          </div>
        </div>
      </div>
    </div>
  );
}
