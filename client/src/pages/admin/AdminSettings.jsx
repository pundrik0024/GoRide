import React from 'react';

export default function AdminSettings() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[#171717] mb-6">System Settings</h1>

      <div className="bg-white border border-[#E6E6E1] rounded-xl p-6 mb-6">
        <h3 className="font-bold text-[#171717] mb-4">General Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#6B6B67] mb-1">Platform Name</label>
            <input type="text" value="GoRide" readOnly className="w-full h-10 px-3 border border-[#E6E6E1] rounded-lg bg-[#F7F7F5] text-[#6B6B67]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#6B6B67] mb-1">Support Email</label>
            <input type="email" value="demo@goride.in" readOnly className="w-full h-10 px-3 border border-[#E6E6E1] rounded-lg bg-[#F7F7F5] text-[#6B6B67]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#6B6B67] mb-1">Contact Number</label>
            <input type="text" value="Demo platform" readOnly className="w-full h-10 px-3 border border-[#E6E6E1] rounded-lg bg-[#F7F7F5] text-[#6B6B67]" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E6E6E1] rounded-xl p-6 mb-6">
        <h3 className="font-bold text-[#171717] mb-4">Payment Gateway</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#6B6B67] mb-1">Provider</label>
            <input type="text" value="Simulated UPI, Card, and Net Banking" readOnly className="w-full h-10 px-3 border border-[#E6E6E1] rounded-lg bg-[#F7F7F5] text-[#6B6B67]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#6B6B67] mb-1">Environment</label>
            <span className="inline-block px-3 py-1 bg-[#E8EEE9] text-[#315C4B] text-xs font-bold rounded-lg border border-[#E6E6E1]">DEMO</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-sm border border-blue-200">
        <span className="material-symbols-outlined align-middle mr-2">info</span>
        Settings are read-only for this demonstration environment.
      </div>
    </div>
  );
}
