import React from 'react';

export default function PassengerForm({ index, passenger, seatNumber, onChange, errors = {} }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(index, { ...passenger, [name]: value });
  };

  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl p-6 mb-4">
      <h3 className="font-bold text-[#171717] mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#E8EEE9] text-[#315C4B] flex items-center justify-center text-xs">
          {index + 1}
        </div>
        Passenger {index + 1}
        {seatNumber && (
          <span className="ml-auto text-sm text-[#6B6B67] bg-[#F7F7F5] px-2 py-1 rounded">
            Seat {seatNumber}
          </span>
        )}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={passenger.name || ''}
            onChange={handleChange}
            className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] transition-colors ${errors.name ? 'border-red-500' : 'border-[#E6E6E1]'}`}
            placeholder="As per Govt. ID"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={passenger.age || ''}
            onChange={handleChange}
            className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] transition-colors ${errors.age ? 'border-red-500' : 'border-[#E6E6E1]'}`}
            placeholder="Years"
            min="1" max="120"
          />
          {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Gender</label>
          <select
            name="gender"
            value={passenger.gender || ''}
            onChange={handleChange}
            className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] transition-colors bg-white ${errors.gender ? 'border-red-500' : 'border-[#E6E6E1]'}`}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Phone</label>
          <input type="tel" name="phone" value={passenger.phone || ''} onChange={handleChange} maxLength="10" className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] ${errors.phone ? 'border-red-500' : 'border-[#E6E6E1]'}`} placeholder="10-digit mobile number" />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Email</label>
          <input type="email" name="email" value={passenger.email || ''} onChange={handleChange} className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] ${errors.email ? 'border-red-500' : 'border-[#E6E6E1]'}`} placeholder="you@example.com" />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>
    </div>
  );
}
