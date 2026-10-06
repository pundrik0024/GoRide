import React from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import { formatDate, formatCurrency, formatTime } from '../../utils/formatters';

export default function BookingCard({ booking, onCancel }) {
  const navigate = useNavigate();
  const travelDate = booking.schedule?.travelDate || booking.travelDate;
  const departureAt = new Date(travelDate);
  const [hours, minutes] = (booking.schedule?.departureTime || booking.departureTime || '00:00').split(':').map(Number);
  departureAt.setHours(hours || 0, minutes || 0, 0, 0);
  const isUpcoming = booking.bookingStatus === 'confirmed' && departureAt > new Date();
  const source = booking.schedule?.route?.source?.name || booking.schedule?.route?.source || 'Source';
  const destination = booking.schedule?.route?.destination?.name || booking.schedule?.route?.destination || 'Destination';

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed': return <Badge variant="success">Confirmed</Badge>;
      case 'cancelled': return <Badge variant="error">Cancelled</Badge>;
      case 'completed': return <Badge variant="default">Completed</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl p-6 mb-4 flex flex-col md:flex-row gap-6 justify-between md:items-center hover:border-[#171717] transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono bg-[#F7F7F5] px-2 py-1 rounded border border-[#E6E6E1]">ID: {booking.bookingId || booking._id}</span>
          {getStatusBadge(booking.bookingStatus)}
        </div>
        
        <h3 className="text-xl font-bold text-[#171717] mb-1">
          {source} <span className="text-[#6B6B67] mx-1">→</span> {destination}
        </h3>
        
        <div className="text-sm text-[#6B6B67] flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            {formatDate(travelDate)}
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {formatTime(booking.schedule?.departureTime)}
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">event_seat</span>
            {booking.seats?.join(', ')} ({booking.seats?.length} Seats)
          </div>
          <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">directions_bus</span>{booking.schedule?.bus?.busNumber || 'Demo bus'}</div>
        </div>
        <div className="text-xs text-[#6B6B67] mt-3">Boarding: {booking.boardingPoint?.name || booking.boardingPoint || '—'} · Drop: {booking.droppingPoint?.name || booking.droppingPoint || '—'}</div>
      </div>

      <div className="flex flex-col md:items-end border-t md:border-t-0 md:border-l border-[#E6E6E1] pt-4 md:pt-0 md:pl-6 gap-3">
        <div className="text-left md:text-right mb-2 md:mb-0">
          <p className="text-xs text-[#6B6B67]">Total Amount</p>
          <p className="text-lg font-bold text-[#171717]">{formatCurrency(booking.totalAmount)}</p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          {booking.bookingStatus === 'confirmed' && (
            <button 
              onClick={() => navigate(`/booking-confirmation/${booking._id}`)}
              className="flex-1 md:flex-none px-4 py-2 border border-[#E6E6E1] text-[#171717] text-sm font-medium rounded-lg hover:bg-[#F7F7F5]"
            >
              Ticket
            </button>
          )}
          {isUpcoming && (
            <>
              <button 
                onClick={() => navigate(`/track/${booking._id}`)}
                className="flex-1 md:flex-none px-4 py-2 bg-[#315C4B] text-white text-sm font-medium rounded-lg hover:bg-[#234F3E]"
              >
                Track
              </button>
              <button 
                onClick={() => onCancel(booking._id)}
                className="px-3 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50"
                title="Cancel Booking"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
