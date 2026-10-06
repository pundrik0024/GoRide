import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrackingView from '../components/tracking/TrackingView';
import Skeleton from '../components/ui/Skeleton';
import { getBooking } from '../services/bookingService';

export default function TrackBusPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    getBooking(bookingId).then(result => setBooking(result.data || result))
      .catch(err => setError(err.response?.data?.message || 'Could not load this trip'))
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading) return <div className="max-w-6xl mx-auto py-12 px-6"><Skeleton height="h-[500px]" rounded="rounded-2xl" /></div>;
  if (error || !booking) return <div className="min-h-[50vh] grid place-items-center text-center"><div><p className="text-[#6B6B67] mb-4">{error || 'Trip not found'}</p><button onClick={() => navigate('/my-bookings')} className="px-5 py-2 bg-[#315C4B] text-white rounded-lg">Back to My Bookings</button></div></div>;
  const schedule = booking.schedule || {};
  const route = schedule.route || {};
  const source = route.source?.name || route.source || 'Origin';
  const destination = route.destination?.name || route.destination || 'Destination';
  const busNumber = schedule.bus?.busNumber || 'GoRide demo bus';

  return <div className="bg-[#F7F7F5] min-h-screen py-8"><div className="max-w-6xl mx-auto px-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"><div><h1 className="text-2xl font-bold text-[#171717]">Trip Tracking</h1><p className="text-sm text-[#6B6B67] mt-1">{busNumber} · {source} to {destination} · Demo simulation</p></div><button onClick={() => navigate('/my-bookings')} className="px-4 py-2 border border-[#E6E6E1] bg-white rounded-lg text-sm font-medium">My Bookings</button></div>
    <TrackingView booking={booking} />
  </div></div>;
}
