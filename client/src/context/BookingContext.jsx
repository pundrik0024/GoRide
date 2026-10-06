import { createContext, useContext, useState, useMemo } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [boardingPoint, setBoardingPoint] = useState(null);
  const [droppingPoint, setDroppingPoint] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const clearBooking = () => {
    setSelectedSchedule(null);
    setSelectedSeats([]);
    setPassengers(1);
    setPassengerDetails([]);
    setBoardingPoint(null);
    setDroppingPoint(null);
    setPaymentMethod('');
  };

  const fareCalculation = useMemo(() => {
    if (!selectedSchedule || selectedSeats.length === 0) {
      return { baseFare: 0, taxes: 0, convenienceFee: 0, totalAmount: 0 };
    }
    const baseFare = selectedSchedule.fare * selectedSeats.length;
    const taxes = Math.round(baseFare * 0.05);
    const convenienceFee = 25;
    const totalAmount = baseFare + taxes + convenienceFee;

    return { baseFare, taxes, convenienceFee, totalAmount };
  }, [selectedSchedule, selectedSeats]);

  const value = {
    selectedSchedule, setSelectedSchedule,
    selectedSeats, setSelectedSeats,
    passengers, setPassengers,
    passengerDetails, setPassengerDetails,
    boardingPoint, setBoardingPoint,
    droppingPoint, setDroppingPoint,
    paymentMethod, setPaymentMethod,
    clearBooking,
    fareCalculation
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
