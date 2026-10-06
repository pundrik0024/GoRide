import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import SeatMap from '../components/booking/SeatMap';
import FareBreakdown from '../components/booking/FareBreakdown';
import { useBooking } from '../context/BookingContext';
import { getSchedule } from '../services/busService';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function SeatSelectionPage() {
  const { scheduleId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSelectedSchedule, setSelectedSeats, passengers, setPassengers } = useBooking();

  const passengersParam = parseInt(searchParams.get('passengers') || 1, 10);
  const [schedule, setSchedule] = useState(null);
  const [localSelectedSeats, setLocalSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPassengers(passengersParam);
  }, [passengersParam, setPassengers]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const res = await getSchedule(scheduleId);
        setSchedule(res.data || res);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load schedule');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [scheduleId]);

  const handleContinue = () => {
    setSelectedSchedule(schedule);
    setSelectedSeats(localSelectedSeats);
    navigate('/passenger-details');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !schedule) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-[#6B6B67] mb-4">error</span>
          <p className="font-headline-sm text-headline-sm text-[#171717]">{error || 'Schedule not found'}</p>
          <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-[#315C4B] text-white rounded-lg hover:bg-[#234F3E]">Go Back</button>
        </div>
      </div>
    );
  }

  const sourceName = schedule.route?.source?.name || schedule.route?.source || 'Source';
  const destName = schedule.route?.destination?.name || schedule.route?.destination || 'Destination';

  return (
    <div className="bg-[#F7F7F5] min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-gutter">
        {/* Route Summary */}
        <div className="bg-white border border-[#E6E6E1] rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-[#171717]">
                {sourceName} <span className="text-[#6B6B67]">→</span> {destName}
              </h1>
              <p className="font-body-md text-body-md text-[#6B6B67] mt-1">
                {schedule.bus?.operatorName} • {schedule.bus?.busType} • {schedule.departureTime} – {schedule.arrivalTime}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {schedule.bus?.amenities?.slice(0, 3).map((amenity, i) => (
                <span key={i} className="px-2.5 py-1 bg-[#F7F7F5] border border-[#E6E6E1] rounded text-[11px] font-medium text-[#6B6B67]">{amenity}</span>
              ))}
            </div>
          </div>
        </div>

        <h2 className="font-headline-sm text-headline-sm text-[#171717] mb-2">Select your seats</h2>
        <p className="font-body-md text-body-md text-[#6B6B67] mb-6">Please select {passengersParam} seat{passengersParam > 1 ? 's' : ''} for your journey.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SeatMap
              totalSeats={schedule.bus?.totalSeats || 40}
              bookedSeats={schedule.bookedSeats || []}
              selectedSeats={localSelectedSeats}
              onSeatSelect={setLocalSelectedSeats}
              maxSeats={passengersParam}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <FareBreakdown
                baseFare={schedule.fare * localSelectedSeats.length}
                numSeats={localSelectedSeats.length}
                seats={localSelectedSeats}
                taxes={Math.round(schedule.fare * localSelectedSeats.length * 0.05)}
                convenienceFee={localSelectedSeats.length > 0 ? 25 : 0}
                totalAmount={
                  localSelectedSeats.length > 0
                    ? schedule.fare * localSelectedSeats.length + Math.round(schedule.fare * localSelectedSeats.length * 0.05) + 25
                    : 0
                }
              />

              <button
                onClick={handleContinue}
                disabled={localSelectedSeats.length !== passengersParam}
                className="w-full h-12 bg-[#315C4B] text-white rounded-lg font-label-md text-label-md font-semibold hover:bg-[#234F3E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {localSelectedSeats.length === passengersParam
                  ? 'Continue to Passenger Details'
                  : `Select ${passengersParam - localSelectedSeats.length} more seat${passengersParam - localSelectedSeats.length !== 1 ? 's' : ''}`
                }
                {localSelectedSeats.length === passengersParam && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
