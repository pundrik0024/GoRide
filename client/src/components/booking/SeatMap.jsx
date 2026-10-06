import React from 'react';

export default function SeatMap({ totalSeats = 40, bookedSeats = [], selectedSeats = [], onSeatSelect, maxSeats }) {
  const rows = Math.ceil(totalSeats / 4);

  const getSeatLabel = (row, col) => {
    const letters = ['A', 'B', 'C', 'D'];
    return `${row}${letters[col]}`;
  };

  const seatIsOutsideBus = (row, col) => (row - 1) * 4 + col >= totalSeats;

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    
    if (selectedSeats.includes(seat)) {
      onSeatSelect(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length < maxSeats) {
        onSeatSelect([...selectedSeats, seat]);
      } else if (maxSeats === 1) {
        onSeatSelect([seat]);
      }
    }
  };

  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl p-8 flex flex-col items-center">
      <div className="w-full max-w-[280px]">
        {/* Driver Area */}
        <div className="flex justify-end mb-8 pb-8 border-b-2 border-dashed border-[#E6E6E1]">
          <div className="w-12 h-12 rounded-lg border-2 border-[#E6E6E1] flex items-center justify-center text-[#E6E6E1]">
            <span className="material-symbols-outlined">steering</span>
          </div>
        </div>

        {/* Seats Grid */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-between items-center w-full">
              {/* Left Side (A, B) */}
              <div className="flex gap-2">
                {[0, 1].map(colIndex => {
                  const seat = getSeatLabel(rowIndex + 1, colIndex);
                  const isBooked = bookedSeats.includes(seat);
                  const outside = seatIsOutsideBus(rowIndex + 1, colIndex);
                  const isSelected = selectedSeats.includes(seat);
                  
                  return (
                    <button
                      key={seat}
                      onClick={() => handleSeatClick(seat)}
                      disabled={isBooked || outside}
                      className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold transition-colors ${
                        isBooked || outside ? 'bg-[#F7F7F5] text-[#6B6B67] border border-[#E6E6E1] opacity-50 cursor-not-allowed' :
                        isSelected ? 'bg-[#315C4B] text-white shadow-inner' :
                        'bg-white text-[#171717] border-2 border-[#E6E6E1] hover:border-[#171717]'
                      }`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>

              {/* Aisle */}
              <div className="w-8 text-center text-xs text-[#E6E6E1] font-bold">{rowIndex + 1}</div>

              {/* Right Side (C, D) */}
              <div className="flex gap-2">
                {[2, 3].map(colIndex => {
                  const seat = getSeatLabel(rowIndex + 1, colIndex);
                  const isBooked = bookedSeats.includes(seat);
                  const outside = seatIsOutsideBus(rowIndex + 1, colIndex);
                  const isSelected = selectedSeats.includes(seat);
                  
                  return (
                    <button
                      key={seat}
                      onClick={() => handleSeatClick(seat)}
                      disabled={isBooked || outside}
                      className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold transition-colors ${
                        isBooked || outside ? 'bg-[#F7F7F5] text-[#6B6B67] border border-[#E6E6E1] opacity-50 cursor-not-allowed' :
                        isSelected ? 'bg-[#315C4B] text-white shadow-inner' :
                        'bg-white text-[#171717] border-2 border-[#E6E6E1] hover:border-[#171717]'
                      }`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#E6E6E1] flex gap-6 w-full justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-[#E6E6E1] bg-white"></div>
          <span className="text-xs text-[#6B6B67]">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#315C4B]"></div>
          <span className="text-xs text-[#6B6B67]">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border border-[#E6E6E1] bg-[#F7F7F5] opacity-50"></div>
          <span className="text-xs text-[#6B6B67]">Booked</span>
        </div>
      </div>
    </div>
  );
}
