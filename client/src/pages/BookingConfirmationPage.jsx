import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DigitalTicket from '../components/ticket/DigitalTicket';
import { getBooking } from '../services/bookingService';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function BookingConfirmationPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getBooking(bookingId);
        setBooking(res.data || res);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load booking');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-[#6B6B67] mb-4 block">error</span>
          <p className="font-headline-sm text-headline-sm text-[#171717] mb-2">{error || 'Booking not found'}</p>
          <button onClick={() => navigate('/')} className="mt-4 px-6 py-2.5 bg-[#315C4B] text-white rounded-lg hover:bg-[#234F3E] font-label-md text-label-md font-semibold">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F5] min-h-screen py-12 px-gutter">
      <div className="max-w-[700px] mx-auto flex flex-col items-center">
        {/* Success Animation */}
        <div className="w-16 h-16 bg-[#315C4B] rounded-full flex items-center justify-center text-white mb-6">
          <span className="material-symbols-outlined text-3xl">check</span>
        </div>

        <h1 className="font-headline-xl text-headline-xl text-[#171717] mb-2 text-center">
          Booking Confirmed!
        </h1>
        <p className="font-body-lg text-body-lg text-[#6B6B67] text-center mb-10">
          Your booking has been confirmed. A digital ticket is ready below.
        </p>

        <DigitalTicket booking={booking} />

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button onClick={() => window.print()} className="h-12 px-8 border border-[#E6E6E1] text-[#171717] rounded-lg font-label-md text-label-md font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
            Download Ticket
          </button>
          <button
            onClick={() => navigate(`/track/${bookingId}`)}
            className="h-12 px-8 bg-[#315C4B] text-white rounded-lg font-label-md text-label-md font-semibold hover:bg-[#234F3E] transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            Track Bus
          </button>
          <button
            onClick={() => navigate('/my-bookings')}
            className="h-12 px-8 border border-[#E6E6E1] text-[#171717] rounded-lg font-label-md text-label-md font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            My Bookings
          </button>
          <button
            onClick={() => navigate('/')}
            className="h-12 px-8 border border-[#E6E6E1] text-[#171717] rounded-lg font-label-md text-label-md font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
