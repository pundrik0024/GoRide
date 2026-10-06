import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../components/admin/DataTable';
import { getBookings } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getBookings({ limit: 500 }).then(result => setBookings(result.data || [])).catch(console.error).finally(() => setLoading(false));
  }, []);

  const rows = useMemo(() => bookings.filter(booking => {
    const route = booking.schedule?.route || {};
    const label = `${booking.bookingId} ${booking.user?.name} ${route.source?.name} ${route.destination?.name}`.toLowerCase();
    return label.includes(query.toLowerCase()) && (status === 'all' || booking.bookingStatus === status);
  }), [bookings, query, status]);

  const columns = [
    { header: 'Booking ID', render: row => <Link to={`/booking-confirmation/${row._id}`} className="font-mono text-xs font-bold text-[#315C4B] hover:underline">{row.bookingId}</Link> },
    { header: 'Passenger', render: row => <span>{row.passengers?.[0]?.name || row.user?.name || '—'}</span> },
    { header: 'Route', render: row => `${row.schedule?.route?.source?.name || '—'} → ${row.schedule?.route?.destination?.name || '—'}` },
    { header: 'Travel Date', render: row => formatDate(row.schedule?.travelDate || row.travelDate) },
    { header: 'Bus', render: row => row.schedule?.bus?.busNumber || '—' },
    { header: 'Seats', render: row => row.seats?.join(', ') || '—' },
    { header: 'Boarding / Drop', render: row => <span className="text-xs">{row.boardingPoint?.name} / {row.droppingPoint?.name}</span> },
    { header: 'Amount', render: row => formatCurrency(row.totalAmount) },
    { header: 'Payment', render: row => row.paymentStatus },
    { header: 'Status', render: row => row.bookingStatus }
  ];

  return <div>
    <h1 className="text-2xl font-bold text-[#171717] mb-6">Bookings</h1>
    <div className="bg-white border border-[#E6E6E1] rounded-xl mb-6 p-4 flex flex-wrap gap-4">
      <input value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="Search booking ID, passenger or route" className="h-10 px-3 border border-[#E6E6E1] rounded-lg text-sm flex-1 min-w-60" />
      <select value={status} onChange={event => setStatus(event.target.value)} className="h-10 px-3 border border-[#E6E6E1] rounded-lg text-sm bg-white"><option value="all">All statuses</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option><option value="pending">Pending</option></select>
    </div>
    <DataTable columns={columns} data={rows} loading={loading} />
  </div>;
}
