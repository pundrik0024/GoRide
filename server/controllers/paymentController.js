import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import Schedule from '../models/Schedule.js';

export const processPayment = async (req, res, next) => {
  try {
    const { bookingId, method } = req.body;

    if (!['UPI', 'Card', 'Net Banking'].includes(method)) {
      return res.status(400).json({ success: false, message: 'Choose a valid payment method' });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (booking.bookingStatus !== 'pending' || booking.paymentStatus !== 'pending') {
      return res.status(400).json({ success: false, message: 'This booking has already been processed' });
    }

    const schedule = await Schedule.findOneAndUpdate(
      { _id: booking.schedule, availableSeats: { $gte: booking.seats.length }, bookedSeats: { $nin: booking.seats } },
      { $addToSet: { bookedSeats: { $each: booking.seats } }, $inc: { availableSeats: -booking.seats.length } },
      { new: true }
    );
    if (!schedule) {
      booking.bookingStatus = 'cancelled';
      booking.paymentStatus = 'failed';
      await booking.save();
      return res.status(409).json({ success: false, message: 'One or more selected seats are no longer available. Please choose again.' });
    }

    const transactionId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    const payment = await Payment.create({
      booking: booking._id,
      user: req.user._id,
      amount: booking.totalAmount,
      method,
      transactionId,
      status: 'success',
      paidAt: new Date()
    });

    booking.paymentStatus = 'completed';
    booking.bookingStatus = 'confirmed';
    await booking.save();

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};
