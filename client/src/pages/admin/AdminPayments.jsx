import React, { useEffect, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import { getPayments } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getPayments({ limit: 500 }).then(result => setPayments(result.data || [])).catch(console.error).finally(() => setLoading(false)); }, []);
  const columns = [
    { header: 'Transaction ID', render: row => <span className="font-mono text-xs">{row.transactionId}</span> },
    { header: 'Booking ID', render: row => row.booking?.bookingId || '—' },
    { header: 'User', render: row => row.user?.name || '—' },
    { header: 'Amount', render: row => <span className="font-bold">{formatCurrency(row.amount)}</span> },
    { header: 'Method', accessor: 'method' },
    { header: 'Date', render: row => formatDate(row.paidAt || row.createdAt) },
    { header: 'Status', accessor: 'status' }
  ];
  return <div><h1 className="text-2xl font-bold text-[#171717] mb-6">Payment Transactions</h1><DataTable columns={columns} data={payments} loading={loading} /></div>;
}
