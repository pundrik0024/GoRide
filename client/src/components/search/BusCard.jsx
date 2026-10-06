import React from 'react';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/formatters';

export default function BusCard({ schedule, onSelect }) {
  const { bus, route, departureTime, arrivalTime, fare, availableSeats } = schedule;

  const sourceName = route?.source?.name || route?.source || 'Source';
  const destName = route?.destination?.name || route?.destination || 'Destination';
  const operatorName = bus?.operatorName || bus?.operator || 'GoRide';
  const busType = bus?.busType || bus?.type || 'AC Seater';
  const duration = route?.estimatedDuration || route?.duration || '';
  const amenities = bus?.amenities || [];

  const formatTimeDisplay = (time) => {
    if (!time) return '--:--';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${h12}:${m} ${ampm}`;
  };

  return (
    <div className="group bg-white border border-[#E6E6E1] rounded-xl p-6 hover:border-[#171717] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex-1">
        {/* Operator & Type */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h3 className="font-headline-sm text-headline-sm text-[#171717] font-bold">{operatorName}</h3>
          <span className="inline-flex items-center px-2.5 py-1 bg-[#F7F7F5] border border-[#E6E6E1] rounded font-body-sm text-body-sm text-[#171717] font-medium">
            {busType}
          </span>
          <div className="flex items-center gap-1 font-body-sm text-body-sm text-[#6B6B67]">
            <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
            {bus?.rating?.toFixed?.(1) || '4.6'}
          </div>
        </div>

        {/* Times */}
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="text-center min-w-[72px]">
            <p className="font-tabular-time text-tabular-time text-[#171717]">{formatTimeDisplay(departureTime)}</p>
            <p className="font-body-sm text-body-sm text-[#6B6B67] truncate">{sourceName}</p>
          </div>

          <div className="flex-1 flex flex-col items-center px-2">
            <p className="font-body-sm text-body-sm text-[#6B6B67] mb-1">{duration}</p>
            <div className="w-full relative flex items-center">
              <div className="h-[1px] bg-[#E6E6E1] w-full"></div>
              <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#315C4B]"></div>
              <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-[#171717]"></div>
            </div>
          </div>

          <div className="text-center min-w-[72px]">
            <p className="font-tabular-time text-tabular-time text-[#171717]">{formatTimeDisplay(arrivalTime)}</p>
            <p className="font-body-sm text-body-sm text-[#6B6B67] truncate">{destName}</p>
          </div>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {amenities.slice(0, 4).map((amenity, i) => (
              <span key={i} className="px-2 py-0.5 bg-[#F7F7F5] border border-[#E6E6E1] rounded font-body-sm text-body-sm text-[#6B6B67]">
                {amenity}
              </span>
            ))}
            {amenities.length > 4 && (
              <span className="px-2 py-0.5 font-body-sm text-body-sm text-[#6B6B67]">+{amenities.length - 4} more</span>
            )}
          </div>
        )}
      </div>

      {/* Price & Action */}
      <div className="flex md:flex-col items-center justify-between md:items-end md:justify-center border-t md:border-t-0 md:border-l border-[#E6E6E1] pt-4 md:pt-0 md:pl-6 gap-4 min-w-[140px]">
        <div className="text-left md:text-right">
          <p className="font-body-sm text-body-sm text-[#6B6B67] mb-0.5">Starting from</p>
          <p className="font-headline-lg text-headline-lg text-[#171717] font-bold">{formatCurrency(fare)}</p>
          <p className={`font-body-sm text-body-sm font-medium mt-1 ${availableSeats <= 5 ? 'text-red-500' : 'text-[#315C4B]'}`}>
            {availableSeats} seat{availableSeats !== 1 ? 's' : ''} left
          </p>
        </div>
        <button
          onClick={() => onSelect(schedule._id)}
          className="h-10 px-5 bg-[#315C4B] text-white font-label-md text-label-md font-semibold rounded-lg hover:bg-[#234F3E] transition-colors flex items-center gap-2"
        >
          View Seats
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
