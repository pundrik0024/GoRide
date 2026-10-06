import React, { useState } from 'react';
import BookingCard from './BookingCard';
import EmptyState from '../ui/EmptyState';

export default function TripTabs({ bookings = [], onCancel }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const departureAt = (booking) => {
    const schedule = booking.schedule || {};
    const date = new Date(schedule.travelDate || booking.travelDate || schedule.date);
    const [hours, minutes] = (schedule.departureTime || booking.departureTime || '00:00').split(':').map(Number);
    date.setHours(hours || 0, minutes || 0, 0, 0);
    return date;
  };
  const upcoming = bookings.filter(b => b.bookingStatus === 'confirmed' && departureAt(b) > new Date());
  const completed = bookings.filter(b => b.bookingStatus === 'completed' || (b.bookingStatus === 'confirmed' && departureAt(b) <= new Date()));
  const cancelled = bookings.filter(b => b.bookingStatus === 'cancelled');

  const getFilteredBookings = () => {
    switch(activeTab) {
      case 'upcoming': return upcoming;
      case 'completed': return completed;
      case 'cancelled': return cancelled;
      default: return [];
    }
  };

  const currentBookings = getFilteredBookings();

  return (
    <div>
      <div className="flex border-b border-[#E6E6E1] mb-6">
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'upcoming' ? 'border-[#315C4B] text-[#315C4B]' : 'border-transparent text-[#6B6B67] hover:text-[#171717]'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'completed' ? 'border-[#315C4B] text-[#315C4B]' : 'border-transparent text-[#6B6B67] hover:text-[#171717]'}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({completed.length})
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'cancelled' ? 'border-[#315C4B] text-[#315C4B]' : 'border-transparent text-[#6B6B67] hover:text-[#171717]'}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled ({cancelled.length})
        </button>
      </div>

      <div className="space-y-4">
        {currentBookings.length === 0 ? (
          <EmptyState 
            icon="event_note"
            title={`No ${activeTab} bookings`}
            description={`You don't have any ${activeTab} trips at the moment.`}
          />
        ) : (
          currentBookings.map(booking => (
            <BookingCard key={booking._id} booking={booking} onCancel={onCancel} />
          ))
        )}
      </div>
    </div>
  );
}
