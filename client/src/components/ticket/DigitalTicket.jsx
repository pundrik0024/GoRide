import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { formatTime, formatDate, formatCurrency } from '../../utils/formatters';

export default function DigitalTicket({ booking }) {
  if (!booking) return null;
  const route = booking.schedule?.route || {};
  const source = route.source?.name || route.source || 'Source';
  const destination = route.destination?.name || route.destination || 'Destination';
  const bus = booking.schedule?.bus || {};
  const ticketId = booking.bookingId || booking._id;

  return (
    <div className="ticket-print-area bg-white border border-[#E6E6E1] rounded-2xl shadow-sm overflow-hidden w-full max-w-2xl mx-auto">
      <div className="bg-[#E8EEE9] p-4 flex items-center justify-between border-b border-[#E6E6E1]">
        <div className={`flex items-center gap-2 ${booking.bookingStatus === 'cancelled' ? 'text-red-700' : 'text-[#315C4B]'}`}><span className="material-symbols-outlined">{booking.bookingStatus === 'cancelled' ? 'cancel' : 'check_circle'}</span><span className="font-bold text-sm">{booking.bookingStatus === 'cancelled' ? 'Booking Cancelled' : 'Booking Confirmed'}</span></div>
        <div className="text-right"><p className="text-xs text-[#6B6B67] uppercase tracking-wider">Booking ID</p><p className="font-mono font-bold text-[#171717]">{ticketId}</p></div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center w-1/3"><p className="text-3xl font-light text-[#171717]">{source.substring(0, 3).toUpperCase()}</p><p className="text-sm font-medium text-[#6B6B67] mt-1">{source}</p><p className="text-lg font-bold text-[#171717] mt-2">{formatTime(booking.schedule?.departureTime || booking.departureTime)}</p></div>
          <div className="flex-1 flex flex-col items-center px-4"><p className="text-xs text-[#6B6B67] mb-2">{formatDate(booking.schedule?.travelDate || booking.travelDate)}</p><div className="w-full flex items-center relative"><div className="h-[1px] bg-[#E6E6E1] w-full"></div><span className="material-symbols-outlined absolute left-1/2 -translate-x-1/2 bg-white px-2 text-[#E6E6E1]">directions_bus</span></div></div>
          <div className="text-center w-1/3"><p className="text-3xl font-light text-[#171717]">{destination.substring(0, 3).toUpperCase()}</p><p className="text-sm font-medium text-[#6B6B67] mt-1">{destination}</p><p className="text-lg font-bold text-[#171717] mt-2">{formatTime(booking.schedule?.arrivalTime || booking.arrivalTime)}</p></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-dashed border-[#E6E6E1] mb-8">
          <div><p className="text-[10px] uppercase text-[#6B6B67] font-medium tracking-wider mb-1">Operator</p><p className="font-bold text-[#171717] text-sm">{bus.operatorName || 'GoRide'}</p></div>
          <div><p className="text-[10px] uppercase text-[#6B6B67] font-medium tracking-wider mb-1">Bus Type</p><p className="font-bold text-[#171717] text-sm">{bus.busType || 'AC Seater'}</p></div>
          <div><p className="text-[10px] uppercase text-[#6B6B67] font-medium tracking-wider mb-1">Seats</p><p className="font-bold text-[#171717] text-sm">{booking.seats?.join(', ')}</p></div>
          <div><p className="text-[10px] uppercase text-[#6B6B67] font-medium tracking-wider mb-1">Total Paid</p><p className="font-bold text-[#171717] text-sm">{formatCurrency(booking.totalAmount)}</p></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 w-full">
            <h4 className="text-xs font-bold text-[#6B6B67] uppercase tracking-wider mb-4">Passengers</h4>
            <div className="space-y-3">{booking.passengers?.map((person, index) => <div key={index} className="flex justify-between items-center text-sm border-b border-[#F7F7F5] pb-2"><span className="font-medium text-[#171717]">{person.name}</span><span className="text-[#6B6B67] text-xs">{person.age} Yrs • {person.gender?.charAt(0)} <strong className="ml-2 text-[#171717]">Seat {person.seatNumber || booking.seats?.[index]}</strong></span></div>)}</div>
            <div className="mt-6 pt-4 border-t border-[#F7F7F5]"><p className="text-xs text-[#6B6B67] mb-1">Boarding at: <span className="font-medium text-[#171717]">{booking.boardingPoint?.name || booking.boardingPoint} {booking.boardingPoint?.timing && `· ${formatTime(booking.boardingPoint.timing)}`}</span></p><p className="text-xs text-[#6B6B67]">Dropping at: <span className="font-medium text-[#171717]">{booking.droppingPoint?.name || booking.droppingPoint} {booking.droppingPoint?.timing && `· ${formatTime(booking.droppingPoint.timing)}`}</span></p><p className="text-xs text-[#6B6B67] mt-2">Payment status: <span className="font-medium text-[#315C4B]">{booking.paymentStatus}</span></p></div>
          </div>
          <div className="p-4 border border-[#E6E6E1] rounded-xl bg-white shadow-sm flex flex-col items-center"><QRCodeSVG value={ticketId || 'demo-ticket'} size={120} /><p className="text-[10px] text-[#6B6B67] mt-2">Scan to board</p></div>
        </div>
      </div>
    </div>
  );
}
