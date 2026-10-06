import React, { useEffect, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import { getBuses } from '../../services/adminService';

export default function AdminBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getBuses().then(result => setBuses(result.data || [])).catch(console.error).finally(() => setLoading(false)); }, []);
  const columns = [
    { header: 'Bus Number', accessor: 'busNumber' }, { header: 'Operator', accessor: 'operatorName' },
    { header: 'Type', accessor: 'busType' }, { header: 'Registration', accessor: 'registrationNumber' },
    { header: 'Seats', accessor: 'totalSeats' }, { header: 'Amenities', render: row => row.amenities?.join(', ') },
    { header: 'Status', accessor: 'status' }
  ];
  return <div><h1 className="text-2xl font-bold text-[#171717] mb-6">Fleet Management</h1><DataTable columns={columns} data={buses} loading={loading} /></div>;
}
