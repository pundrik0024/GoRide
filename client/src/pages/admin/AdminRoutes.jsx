import React, { useEffect, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import { getRoutes } from '../../services/adminService';

export default function AdminRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getRoutes().then(result => setRoutes(result.data || [])).catch(console.error).finally(() => setLoading(false)); }, []);
  const columns = [
    { header: 'Source', render: row => row.source?.name || '—' },
    { header: 'Destination', render: row => row.destination?.name || '—' },
    { header: 'Distance', render: row => `${row.distance} km` },
    { header: 'Duration', accessor: 'estimatedDuration' },
    { header: 'Boarding points', render: row => row.boardingPoints?.map(point => point.name).join(', ') },
    { header: 'Dropping points', render: row => row.droppingPoints?.map(point => point.name).join(', ') },
    { header: 'Status', accessor: 'status' }
  ];
  return <div><h1 className="text-2xl font-bold text-[#171717] mb-6">Route Management</h1><DataTable columns={columns} data={routes} loading={loading} /></div>;
}
