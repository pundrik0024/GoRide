import React, { useEffect, useState } from 'react';
import ChartCard from '../../components/admin/ChartCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDashboard } from '../../services/adminService';
import { formatCurrency } from '../../utils/formatters';

export default function AdminReports() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    getDashboard().then(result => setData((result.data?.revenueOverTime || []).map(day => ({ name: day._id.slice(5), revenue: day.total }))))
      .catch(err => setError(err.response?.data?.message || 'Could not load report data'));
  }, []);
  return <div><h1 className="text-2xl font-bold text-[#171717] mb-6">Reports & Analytics</h1>{error ? <p className="text-red-700">{error}</p> : <ChartCard title="Recorded demo revenue (last 30 days)"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#315C4B" stopOpacity={0.3} /><stop offset="95%" stopColor="#315C4B" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E6E1" /><XAxis dataKey="name" /><YAxis /><Tooltip formatter={value => formatCurrency(value)} /><Area type="monotone" dataKey="revenue" stroke="#315C4B" strokeWidth={3} fill="url(#revenueFill)" /></AreaChart></ResponsiveContainer></ChartCard>}</div>;
}
