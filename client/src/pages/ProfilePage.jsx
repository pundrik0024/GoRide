import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  return <div className="min-h-[70vh] bg-[#F7F7F5] py-12 px-gutter"><div className="max-w-2xl mx-auto bg-white border border-[#E6E6E1] rounded-2xl p-8">
    <h1 className="text-2xl font-bold text-[#171717] mb-2">Your profile</h1><p className="text-sm text-[#6B6B67] mb-8">Account details used for your GoRide demo bookings.</p>
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6"><div><dt className="text-xs uppercase tracking-wider text-[#6B6B67]">Name</dt><dd className="font-semibold mt-1">{user?.name}</dd></div><div><dt className="text-xs uppercase tracking-wider text-[#6B6B67]">Role</dt><dd className="font-semibold mt-1 capitalize">{user?.role}</dd></div><div><dt className="text-xs uppercase tracking-wider text-[#6B6B67]">Email</dt><dd className="font-semibold mt-1">{user?.email}</dd></div><div><dt className="text-xs uppercase tracking-wider text-[#6B6B67]">Phone</dt><dd className="font-semibold mt-1">{user?.phone || 'Not provided'}</dd></div></dl>
  </div></div>;
}
