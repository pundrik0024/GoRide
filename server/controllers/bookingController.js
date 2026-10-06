import Booking from '../models/Booking.js';
import Schedule from '../models/Schedule.js';
import Payment from '../models/Payment.js';
import Route from '../models/Route.js';
import Bus from '../models/Bus.js';
import { generateBookingId } from '../utils/generateBookingId.js';

export const createBooking = async (req, res, next) => {
  try {
    const { scheduleId, passengers, seats, boardingPoint, droppingPoint } = req.body;

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    if (!Array.isArray(seats) || seats.length === 0 || !Array.isArray(passengers) || passengers.length !== seats.length) {
      return res.status(400).json({ success: false, message: 'Select seats and provide one passenger per seat' });
    }
    if (new Set(seats).size !== seats.length) {
      return res.status(400).json({ success: false, message: 'Duplicate seats are not allowed' });
    }
    const bus = await Bus.findById(schedule.bus);
    const seatPattern = /^(\d+)([A-D])$/;
    const validSeat = seats.every(seat => {
      const match = seatPattern.exec(seat);
      return match && Number(match[1]) >= 1 && Number(match[1]) <= Math.ceil((bus?.totalSeats || 0) / 4);
    });
    if (!validSeat) return res.status(400).json({ success: false, message: 'One or more seat numbers are invalid' });
    const validPassengers = passengers.every(passenger =>
      passenger.name?.trim().length >= 2 && Number(passenger.age) >= 1 && Number(passenger.age) <= 120 &&
      ['Male', 'Female', 'Other'].includes(passenger.gender) && /^\d{10}$/.test(passenger.phone || '') &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email || '')
    );
    if (!validPassengers) return res.status(400).json({ success: false, message: 'Enter valid passenger name, age, gender, phone, and email' });
    if (!boardingPoint?.name || !droppingPoint?.name) {
      return res.status(400).json({ success: false, message: 'Choose a boarding point and dropping point' });
    }
    const route = await Route.findById(schedule.route);
    const boardingPoints = schedule.boardingPoints?.length ? schedule.boardingPoints : route?.boardingPoints || [];
    const droppingPoints = schedule.droppingPoints?.length ? schedule.droppingPoints : route?.droppingPoints || [];
    if (!boardingPoints.some(point => point.name === boardingPoint.name) || !droppingPoints.some(point => point.name === droppingPoint.name)) {
      return res.status(400).json({ success: false, message: 'Choose valid points for this route' });
    }

    if (schedule.availableSeats < seats.length) {
      return res.status(400).json({ success: false, message: 'Not enough seats available' });
    }

    const alreadyBooked = seats.some(seat => schedule.bookedSeats.includes(seat));
    if (alreadyBooked) {
      return res.status(400).json({ success: false, message: 'Some seats are already booked' });
    }

    const baseFare = schedule.fare * seats.length;
    const taxes = Math.round(baseFare * 0.05);
    const convenienceFee = 25;
    const totalAmount = baseFare + taxes + convenienceFee;

    const bookingId = generateBookingId();

    const booking = await Booking.create({
      bookingId,
      user: req.user._id,
      schedule: scheduleId,
      passengers: passengers.map((passenger, index) => ({ ...passenger, seatNumber: seats[index] })),
      seats,
      boardingPoint,
      droppingPoint,
      fare: baseFare,
      baseFare,
      taxes,
      tax: taxes,
      convenienceFee,
      discount: 0,
      totalAmount,
      travelDate: schedule.travelDate,
      departureTime: schedule.departureTime,
      arrivalTime: schedule.arrivalTime,
      route: schedule.route,
      bus: schedule.bus,
      bookingStatus: 'pending',
      paymentStatus: 'pending'
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate({
        path: 'schedule',
        populate: [
          { path: 'bus' },
          { path: 'route', populate: ['source', 'destination'] }
        ]
      });

    res.status(201).json({
      success: true,
      data: populatedBooking
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'schedule',
        populate: [
          { path: 'bus' },
          { path: 'route', populate: ['source', 'destination'] }
        ]
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findOne(/^[a-f\d]{24}$/i.test(id) ? { _id: id } : { bookingId: id })
      .populate({
        path: 'schedule',
        populate: [
          { path: 'bus' },
          { path: 'route', populate: ['source', 'destination'] }
        ]
      });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    if (booking.bookingStatus !== 'confirmed') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled or completed' });
    }

    const schedule = await Schedule.findById(booking.schedule);
    if (schedule) {
      const departureAt = new Date(schedule.travelDate);
      const [hours, minutes] = schedule.departureTime.split(':').map(Number);
      departureAt.setHours(hours, minutes, 0, 0);
      if (departureAt <= new Date()) {
        return res.status(400).json({ success: false, message: 'Past trips cannot be cancelled' });
      }
    }

    const seatsWereReserved = booking.bookingStatus === 'confirmed';
    booking.bookingStatus = 'cancelled';
    booking.cancelledAt = new Date();

    if (booking.paymentStatus === 'completed') {
      booking.paymentStatus = 'refund_initiated';
      await Payment.findOneAndUpdate(
        { booking: booking._id },
        { status: 'refund_initiated', refundedAt: new Date() }
      );
    }
    
    await booking.save();

    if (schedule && seatsWereReserved) {
      schedule.bookedSeats = schedule.bookedSeats.filter(seat => !booking.seats.includes(seat));
      schedule.availableSeats += booking.seats.length;
      await schedule.save();
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};
