import React, { useState, useEffect } from 'react';
import TripTabs from '../components/dashboard/TripTabs';
import Skeleton from '../components/ui/Skeleton';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import { getUserBookings, cancelBooking } from '../services/bookingService';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModal, setCancelModal] = useState({ isOpen: false, bookingId: null });
  const [cancelling, setCancelling] = useState(false);
  const [feedback, setFeedback] = useState('');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getUserBookings();
      setBookings(res.data || res || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelClick = (id) => {
    setCancelModal({ isOpen: true, bookingId: id });
  };

  const confirmCancellation = async () => {
    setCancelling(true);
    try {
      await cancelBooking(cancelModal.bookingId);
      setFeedback('Booking cancelled. The selected seats are available again and the demo refund is initiated.');
      await fetchBookings();
    } catch (err) {
      setFeedback(err.response?.data?.message || 'Cancellation failed. Please try again.');
    } finally {
      setCancelling(false);
      setCancelModal({ isOpen: false, bookingId: null });
    }
  };

  return (
    <div className="bg-[#F7F7F5] min-h-screen py-12 px-gutter">
      <div className="max-w-[900px] mx-auto">
        <h1 className="font-headline-lg text-headline-lg text-[#171717] mb-8">My Bookings</h1>
        {feedback && <div className="bg-[#E8EEE9] border border-[#E6E6E1] text-[#315C4B] p-4 rounded-lg mb-6" role="status">{feedback}</div>}

        {loading ? (
          <div className="space-y-4">
            <Skeleton height="h-12" />
            <Skeleton height="h-32" rounded="rounded-xl" />
            <Skeleton height="h-32" rounded="rounded-xl" />
          </div>
        ) : bookings.length === 0 ? (
          <EmptyState
            icon="confirmation_number"
            title="No bookings yet"
            description="You haven't made any bookings yet. Search for a bus and book your first journey!"
            actionLabel="Search Buses"
            onAction={() => window.location.href = '/'}
          />
        ) : (
          <TripTabs bookings={bookings} onCancel={handleCancelClick} />
        )}
      </div>

      <Modal
        isOpen={cancelModal.isOpen}
        onClose={() => setCancelModal({ isOpen: false, bookingId: null })}
        title="Cancel Booking"
      >
        <p className="font-body-md text-body-md text-[#6B6B67] mb-6">
          Are you sure you want to cancel this booking? A refund will be initiated to your original payment method.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setCancelModal({ isOpen: false, bookingId: null })}
            className="px-6 py-2.5 border border-[#E6E6E1] rounded-lg font-label-md text-label-md font-medium text-[#171717] hover:bg-[#F7F7F5]"
          >
            No, keep it
          </button>
          <button
            onClick={confirmCancellation}
            disabled={cancelling}
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-label-md text-label-md font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {cancelling ? 'Cancelling...' : 'Yes, Cancel Booking'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
