import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export default function FareBreakdown({ baseFare, numSeats, seats = [], taxes, convenienceFee, totalAmount }) {
  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl p-6">
      <h3 className="font-bold text-[#171717] mb-4">Fare Breakdown</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center text-[#6B6B67]">
          <span>Base Fare (×{numSeats} seats)</span>
          <span className="font-medium text-[#171717]">{formatCurrency(baseFare)}</span>
        </div>
        
        {seats.length > 0 && (
          <div className="text-xs text-[#6B6B67] mt-1 pl-2 border-l-2 border-[#E6E6E1]">
            Seats: {seats.join(', ')}
          </div>
        )}

        <div className="flex justify-between items-center text-[#6B6B67]">
          <span>Taxes (GST 5%)</span>
          <span className="font-medium text-[#171717]">{formatCurrency(taxes)}</span>
        </div>
        
        <div className="flex justify-between items-center text-[#6B6B67]">
          <span>Convenience Fee</span>
          <span className="font-medium text-[#171717]">{formatCurrency(convenienceFee)}</span>
        </div>
      </div>

      <div className="my-4 border-t border-dashed border-[#E6E6E1]"></div>
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs text-[#6B6B67] font-medium uppercase tracking-wider mb-1">Total Amount</p>
          <p className="text-3xl font-bold text-[#171717]">{formatCurrency(totalAmount)}</p>
        </div>
      </div>
    </div>
  );
}
