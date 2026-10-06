import React, { useEffect, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import { getSchedules } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function AdminSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getSchedules().then(result => setSchedules(result.data || [])).catch(console.error).finally(() => setLoading(false)); }, []);
  const columns = [
    { header: 'Route', render: row => `${row.route?.source?.name || '—'} → ${row.route?.destination?.name || '—'}` },
    { header: 'Bus', render: row => row.bus?.busNumber || '—' },
    { header: 'Date', render: row => formatDate(row.travelDate) },
    { header: 'Departure', accessor: 'departureTime' },
    { header: 'Arrival', accessor: 'arrivalTime' },
    { header: 'Fare', render: row => formatCurrency(row.fare) },
    { header: 'Seats', render: row => `${row.availableSeats} / ${row.bus?.totalSeats}` },
    { header: 'Status', accessor: 'status' }
  ];
  return <div><h1 className="text-2xl font-bold text-[#171717] mb-6">Schedule Management</h1><DataTable columns={columns} data={schedules} loading={loading} /></div>;
}
