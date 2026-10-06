import React from 'react';

export default function DigitalPass() {
  return (
    <section className="py-20 px-6 bg-[#F7F7F5] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 flex justify-center">
          <div className="relative w-[300px] h-[600px] bg-white rounded-[40px] border-[8px] border-[#171717] shadow-2xl flex flex-col overflow-hidden">
            <div className="h-6 bg-[#171717] w-full flex justify-center">
              <div className="w-32 h-4 bg-black rounded-b-xl"></div>
            </div>
            <div className="flex-1 p-6 bg-[#F7F7F5] overflow-y-auto">
              <div className="bg-white rounded-2xl border border-[#E6E6E1] p-5 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Boarding Pass</h3>
                  <div className="bg-[#E8EEE9] text-[#315C4B] px-2 py-1 rounded text-xs font-bold">CONFIRMED</div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    <p className="text-3xl font-light text-[#171717]">JAI</p>
                    <p className="text-xs text-[#6B6B67]">Jaipur</p>
                  </div>
                  <span className="material-symbols-outlined text-[#E6E6E1] text-3xl">arrow_right_alt</span>
                  <div className="text-center">
                    <p className="text-3xl font-light text-[#171717]">DEL</p>
                    <p className="text-xs text-[#6B6B67]">Delhi</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-dashed border-[#E6E6E1]">
                  <div>
                    <p className="text-[10px] uppercase text-[#6B6B67] mb-1">Date</p>
                    <p className="text-sm font-bold">12 Oct 2026</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-[#6B6B67] mb-1">Departure</p>
                    <p className="text-sm font-bold">10:00 AM</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-[#6B6B67] mb-1">Seat</p>
                    <p className="text-sm font-bold">12A, 12B</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-[#6B6B67] mb-1">Platform</p>
                    <p className="text-sm font-bold">B4</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed border-[#E6E6E1] flex justify-center">
                  <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-400 text-4xl">qr_code_2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl md:text-5xl font-bold text-[#171717] mb-6">Your device is your ticket.</h2>
          <p className="text-[#6B6B67] text-lg leading-relaxed mb-8">
            Your booking creates a QR ticket with passenger, seat, fare, and pickup details. Open any confirmed demo booking to view or print its ticket.
          </p>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-[#171717] font-medium">
              <span className="material-symbols-outlined text-[#315C4B]">check_circle</span>
              Booking ID QR code
            </li>
            <li className="flex items-center gap-3 text-[#171717] font-medium">
              <span className="material-symbols-outlined text-[#315C4B]">check_circle</span>
              Seat and passenger details
            </li>
            <li className="flex items-center gap-3 text-[#171717] font-medium">
              <span className="material-symbols-outlined text-[#315C4B]">check_circle</span>
              Downloadable ticket
            </li>
          </ul>

          <button onClick={() => window.location.assign('/my-bookings')} className="px-6 py-3 bg-[#171717] text-white rounded-lg font-medium hover:bg-[#313030] transition-colors inline-flex items-center gap-2">
            <span className="material-symbols-outlined">download</span>
            View My Bookings
          </button>
        </div>
      </div>
    </section>
  );
}
