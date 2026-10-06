import { generateBookingId } from '../utils/generateBookingId.js';

export const getBookings = (users, schedules, routes) => {
  const confirmedBookings = [];
  const routeById = new Map(routes.map(route => [route._id.toString(), route]));

  for (let index = 0; index < 8; index += 1) {
    const user = users[index % users.length];
    const schedulesPerRoute = 31 * 3;
    const schedule = schedules[index * schedulesPerRoute];
    const route = routeById.get(schedule.route.toString());
    const seat = `${index + 1}A`;
    const baseFare = schedule.fare;
    const tax = Math.round(baseFare * 0.05);
    const passenger = {
      name: user.name,
      age: 25 + index % 12,
      gender: index % 2 ? 'Female' : 'Male',
      phone: user.phone,
      email: user.email,
      seatNumber: seat
    };

    schedule.bookedSeats.push(seat);
    schedule.availableSeats -= 1;
    confirmedBookings.push({
      bookingId: generateBookingId(),
      user: user._id,
      schedule: schedule._id,
      route: schedule.route,
      bus: schedule.bus,
      passengers: [passenger],
      seats: [seat],
      boardingPoint: route.boardingPoints[0],
      droppingPoint: route.droppingPoints[0],
      fare: baseFare,
      baseFare,
      taxes: tax,
      tax,
      convenienceFee: 25,
      discount: 0,
      totalAmount: baseFare + tax + 25,
      travelDate: schedule.travelDate,
      departureTime: schedule.departureTime,
      arrivalTime: schedule.arrivalTime,
      bookingStatus: 'confirmed',
      paymentStatus: 'completed'
    });
  }

  return confirmedBookings;
};
