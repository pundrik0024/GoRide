import React, { useEffect, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import { getUsers } from '../../services/adminService';
import { formatDate } from '../../utils/formatters';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getUsers({ limit: 500 }).then(result => setUsers(result.data || [])).catch(console.error).finally(() => setLoading(false)); }, []);
  const columns = [
    { header: 'Name', accessor: 'name' }, { header: 'Email', accessor: 'email' }, { header: 'Phone', accessor: 'phone' },
    { header: 'Role', render: row => <span className={row.role === 'admin' ? 'font-bold text-[#315C4B]' : ''}>{row.role}</span> },
    { header: 'Joined', render: row => formatDate(row.createdAt) }
  ];
  return <div><h1 className="text-2xl font-bold text-[#171717] mb-6">User Management</h1><DataTable columns={columns} data={users} loading={loading} /></div>;
}
