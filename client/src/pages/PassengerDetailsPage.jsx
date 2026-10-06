import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PassengerForm from '../components/booking/PassengerForm';
import FareBreakdown from '../components/booking/FareBreakdown';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { validateName, validateAge, validatePhone, validateEmail } from '../utils/validators';

export default function PassengerDetailsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedSchedule, selectedSeats, fareCalculation, setBoardingPoint, setDroppingPoint, setPassengerDetails } = useBooking();

  const [passengerData, setPassengerData] = useState([]);
  const [boarding, setBoarding] = useState('');
  const [dropping, setDropping] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!selectedSchedule || selectedSeats.length === 0) {
      navigate('/');
      return;
    }
    setPassengerData(selectedSeats.map((seat, i) => ({
      name: i === 0 && user ? user.name : '',
      age: '',
      gender: 'Male',
      phone: i === 0 && user ? user.phone || '' : '',
      email: i === 0 && user ? user.email || '' : '',
    })));
  }, [selectedSchedule, selectedSeats, navigate, user]);

  const handlePassengerChange = (index, data) => {
    const newData = [...passengerData];
    newData[index] = data;
    setPassengerData(newData);
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    passengerData.forEach((p, idx) => {
      newErrors[idx] = {};
      if (!validateName(p.name)) { newErrors[idx].name = 'Name is required (min 2 characters)'; isValid = false; }
      if (!validateAge(p.age)) { newErrors[idx].age = 'Enter valid age (1-120)'; isValid = false; }
      if (!p.gender) { newErrors[idx].gender = 'Select gender'; isValid = false; }
      if (!validatePhone(p.phone)) { newErrors[idx].phone = 'Enter valid 10-digit phone'; isValid = false; }
      if (!validateEmail(p.email)) { newErrors[idx].email = 'Enter a valid email'; isValid = false; }
    });

    if (!boarding) { newErrors.boarding = 'Select a boarding point'; isValid = false; }
    if (!dropping) { newErrors.dropping = 'Select a dropping point'; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validate()) {
      setPassengerDetails(passengerData);
      setBoardingPoint(boardingPoints.find(point => point.name === boarding));
      setDroppingPoint(droppingPoints.find(point => point.name === dropping));
      navigate('/payment');
    }
  };

  if (!selectedSchedule) return null;

  const sourceName = selectedSchedule.route?.source?.name || selectedSchedule.route?.source || '';
  const destName = selectedSchedule.route?.destination?.name || selectedSchedule.route?.destination || '';
  const boardingPoints = selectedSchedule.boardingPoints?.length ? selectedSchedule.boardingPoints : selectedSchedule.route?.boardingPoints || [
    { name: `${sourceName} Bus Stand` },
    { name: `${sourceName} Main Terminal` },
    { name: 'Highway Pickup Point' },
  ];
  const droppingPoints = selectedSchedule.droppingPoints?.length ? selectedSchedule.droppingPoints : selectedSchedule.route?.droppingPoints || [
    { name: `${destName} Bus Stand` },
    { name: `${destName} Main Terminal` },
    { name: 'City Center Drop' },
  ];

  return (
    <div className="bg-[#F7F7F5] min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-gutter">
        <h1 className="font-headline-lg text-headline-lg text-[#171717] mb-2">Passenger Details</h1>
        <p className="font-body-md text-body-md text-[#6B6B67] mb-8">
          {sourceName} → {destName} • {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}: {selectedSeats.join(', ')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Boarding & Dropping Points */}
            <div className="bg-white border border-[#E6E6E1] rounded-xl p-6">
              <h3 className="font-headline-sm text-headline-sm text-[#171717] mb-4">Boarding & Dropping</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-sm text-label-sm text-[#6B6B67] uppercase tracking-wider mb-1.5">Boarding Point</label>
                  <select
                    value={boarding}
                    onChange={(e) => setBoarding(e.target.value)}
                    className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] bg-white font-body-md text-body-md ${errors.boarding ? 'border-red-400' : 'border-[#E6E6E1]'}`}
                  >
                    <option value="">Select Boarding Point</option>
                    {boardingPoints.map((bp, i) => (
                      <option key={i} value={bp.name}>{bp.name}{bp.timing ? ` (${bp.timing})` : ''}</option>
                    ))}
                  </select>
                  {errors.boarding && <p className="font-body-sm text-body-sm text-red-500 mt-1">{errors.boarding}</p>}
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-[#6B6B67] uppercase tracking-wider mb-1.5">Dropping Point</label>
                  <select
                    value={dropping}
                    onChange={(e) => setDropping(e.target.value)}
                    className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] bg-white font-body-md text-body-md ${errors.dropping ? 'border-red-400' : 'border-[#E6E6E1]'}`}
                  >
                    <option value="">Select Dropping Point</option>
                    {droppingPoints.map((dp, i) => (
                      <option key={i} value={dp.name}>{dp.name}{dp.timing ? ` (${dp.timing})` : ''}</option>
                    ))}
                  </select>
                  {errors.dropping && <p className="font-body-sm text-body-sm text-red-500 mt-1">{errors.dropping}</p>}
                </div>
              </div>
            </div>

            {/* Passenger Forms */}
            {passengerData.map((passenger, idx) => (
              <PassengerForm
                key={idx}
                index={idx}
                seatNumber={selectedSeats[idx]}
                passenger={passenger}
                onChange={handlePassengerChange}
                errors={errors[idx] || {}}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <FareBreakdown
                baseFare={fareCalculation.baseFare}
                numSeats={selectedSeats.length}
                seats={selectedSeats}
                taxes={fareCalculation.taxes}
                convenienceFee={fareCalculation.convenienceFee}
                totalAmount={fareCalculation.totalAmount}
              />

              <button
                onClick={handleContinue}
                className="w-full h-12 bg-[#315C4B] text-white rounded-lg font-label-md text-label-md font-semibold hover:bg-[#234F3E] transition-colors flex items-center justify-center gap-2"
              >
                Continue to Payment
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
