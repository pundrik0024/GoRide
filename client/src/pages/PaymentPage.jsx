import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '../components/booking/PaymentForm';
import { useBooking } from '../context/BookingContext';
import { createBooking, processPayment } from '../services/bookingService';
import { formatCurrency, formatDate } from '../utils/formatters';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function PaymentPage() {
  const navigate = useNavigate();
  const {
    selectedSchedule, selectedSeats, fareCalculation,
    boardingPoint, droppingPoint, passengerDetails, clearBooking
  } = useBooking();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedSchedule || selectedSeats.length === 0) {
      navigate('/');
    }
  }, [selectedSchedule, selectedSeats, navigate]);

  if (!selectedSchedule) return null;

  const sourceName = selectedSchedule.route?.source?.name || selectedSchedule.route?.source || '';
  const destName = selectedSchedule.route?.destination?.name || selectedSchedule.route?.destination || '';

  const handlePaymentSubmit = async (method) => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create booking
      const bookingRes = await createBooking({
        scheduleId: selectedSchedule._id,
        passengers: passengerDetails,
        seats: selectedSeats,
        boardingPoint,
        droppingPoint,
      });

      const booking = bookingRes.data || bookingRes;

      // Step 2: Process payment
      await new Promise(resolve => setTimeout(resolve, 750));
      await processPayment({
        bookingId: booking._id,
        method,
      });

      clearBooking();
      navigate(`/booking-confirmation/${booking._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F7F5] min-h-screen py-8">
      <div className="max-w-[700px] mx-auto px-gutter">
        <h1 className="font-headline-lg text-headline-lg text-[#171717] mb-8">Secure Payment</h1>

        {/* Order Summary */}
        <div className="bg-white border border-[#E6E6E1] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E6E6E1]">
            <div>
              <p className="font-label-sm text-label-sm text-[#6B6B67] uppercase tracking-wider mb-1">Route</p>
              <p className="font-headline-sm text-headline-sm text-[#171717]">{sourceName} → {destName}</p>
            </div>
            <div className="text-right">
              <p className="font-label-sm text-label-sm text-[#6B6B67] uppercase tracking-wider mb-1">Seats</p>
              <p className="font-headline-sm text-headline-sm text-[#315C4B]">{selectedSeats.join(', ')}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-body-md text-body-md text-[#6B6B67]">
              {formatDate(selectedSchedule.travelDate)} • {selectedSchedule.departureTime} – {selectedSchedule.arrivalTime} • {selectedSchedule.bus?.busNumber} · {selectedSchedule.bus?.operatorName}
            </p>
            <div className="text-right">
              <p className="font-label-sm text-label-sm text-[#6B6B67] uppercase tracking-wider mb-1">Total</p>
              <p className="font-headline-lg text-headline-lg text-[#171717] font-bold">{formatCurrency(fareCalculation.totalAmount)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#E6E6E1] text-sm">
            <div><p className="text-xs text-[#6B6B67]">Boarding point</p><p className="font-medium">{boardingPoint?.name}</p></div>
            <div><p className="text-xs text-[#6B6B67]">Dropping point</p><p className="font-medium">{droppingPoint?.name}</p></div>
            <div className="col-span-2"><p className="text-xs text-[#6B6B67]">Passengers</p><p className="font-medium">{passengerDetails.map((person, index) => `${person.name} (${selectedSeats[index]})`).join(', ')}</p></div>
            <div><p className="text-xs text-[#6B6B67]">Base fare</p><p className="font-medium">{formatCurrency(fareCalculation.baseFare)}</p></div>
            <div><p className="text-xs text-[#6B6B67]">Tax</p><p className="font-medium">{formatCurrency(fareCalculation.taxes)}</p></div>
            <div><p className="text-xs text-[#6B6B67]">Convenience fee</p><p className="font-medium">{formatCurrency(fareCalculation.convenienceFee)}</p></div>
            <div><p className="text-xs text-[#6B6B67]">Discount</p><p className="font-medium">{formatCurrency(0)}</p></div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 font-body-md text-body-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-[#E6E6E1] rounded-xl p-12 flex flex-col items-center justify-center">
            <LoadingSpinner />
            <p className="mt-4 font-body-md text-body-md text-[#6B6B67]">Processing payment...</p>
            <p className="mt-1 font-body-sm text-body-sm text-[#6B6B67]">Please do not close this page</p>
          </div>
        ) : (
          <PaymentForm
            amount={fareCalculation.totalAmount}
            onSubmit={handlePaymentSubmit}
            loading={loading}
          />
        )}

        <div className="mt-6 flex items-center justify-center gap-2 font-body-sm text-body-sm text-[#6B6B67]">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          This is a demo payment. No real payment is taken.
        </div>
      </div>
    </div>
  );
}
