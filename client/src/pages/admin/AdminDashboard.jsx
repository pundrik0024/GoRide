import React, { useEffect, useState } from 'react';
import StatsCard from '../../components/admin/StatsCard';
import ChartCard from '../../components/admin/ChartCard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDashboard } from '../../services/adminService';
import { formatCurrency } from '../../utils/formatters';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    getDashboard().then(result => setStats(result.data)).catch(err => setError(err.response?.data?.message || 'Could not load dashboard data'));
  }, []);
  if (error) return <div className="p-8 text-red-700">{error}</div>;
  if (!stats) return <div className="p-8">Loading dashboard…</div>;
  const bookings = (stats.bookingsOverTime || []).map(day => ({ name: day._id.slice(5), bookings: day.count }));
  const revenue = (stats.revenueOverTime || []).map(day => ({ name: day._id.slice(5), revenue: day.total }));

  return <div className="space-y-6">
    <h1 className="text-2xl font-bold text-[#171717]">Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <StatsCard title="Today's Bookings" value={stats.todayBookings} icon="book_online" />
      <StatsCard title="Total Bookings" value={stats.totalBookings} icon="history" />
      <StatsCard title="Revenue" value={formatCurrency(stats.totalRevenue)} icon="payments" />
      <StatsCard title="Active Buses" value={stats.activeBuses} icon="directions_bus" />
      <StatsCard title="Passengers" value={stats.totalPassengers} icon="group" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="Bookings (last 30 days)"><ResponsiveContainer width="100%" height="100%"><LineChart data={bookings}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E6E1" /><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Line type="monotone" dataKey="bookings" stroke="#315C4B" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Revenue (last 30 days)"><ResponsiveContainer width="100%" height="100%"><BarChart data={revenue}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E6E1" /><XAxis dataKey="name" /><YAxis /><Tooltip formatter={value => formatCurrency(value)} /><Bar dataKey="revenue" fill="#315C4B" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></ChartCard>
    </div>
    <section className="bg-white border border-[#E6E6E1] rounded-xl p-6"><h2 className="font-bold mb-4">Recent bookings</h2><div className="divide-y divide-[#E6E6E1]">{(stats.recentBookings || []).map(booking => <div key={booking._id} className="py-3 flex justify-between gap-4"><span>{booking.bookingId} · {booking.user?.name || 'Guest'}</span><span className="text-[#6B6B67]">{booking.bookingStatus}</span></div>)}</div></section>
  </div>;
}
