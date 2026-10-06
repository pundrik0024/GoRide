import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Bus from '../models/Bus.js';
import Route from '../models/Route.js';
import Schedule from '../models/Schedule.js';
import User from '../models/User.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayBookings = await Booking.countDocuments({ createdAt: { $gte: startOfToday } });
    const totalBookings = await Booking.countDocuments();
    
    const completedPayments = await Payment.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = completedPayments.length > 0 ? completedPayments[0].total : 0;

    const activeBuses = await Bus.countDocuments({ status: 'active' });

    const confirmedBookings = await Booking.find({ bookingStatus: 'confirmed' });
    const totalPassengers = confirmedBookings.reduce((sum, b) => sum + b.passengers.length, 0);

    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const bookingsOverTime = await Booking.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
      }},
      { $sort: { _id: 1 } }
    ]);

    const revenueOverTime = await Payment.aggregate([
      { $match: { status: 'success', paidAt: { $gte: thirtyDaysAgo } } },
      { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$paidAt' } },
          total: { $sum: '$amount' }
      }},
      { $sort: { _id: 1 } }
    ]);

    const topRoutes = await Booking.aggregate([
      { $lookup: { from: 'schedules', localField: 'schedule', foreignField: '_id', as: 'scheduleObj' } },
      { $unwind: '$scheduleObj' },
      { $group: { _id: '$scheduleObj.route', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    const popularRoutesData = await Route.populate(topRoutes, { path: '_id', select: 'source destination', populate: ['source', 'destination'] });

    res.status(200).json({
      success: true,
      data: {
        todayBookings,
        totalBookings,
        totalRevenue,
        activeBuses,
        totalPassengers,
        recentBookings,
        bookingsOverTime,
        revenueOverTime,
        popularRoutes: popularRoutesData
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await Booking.countDocuments();
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate({ path: 'schedule', populate: [{ path: 'bus' }, { path: 'route', populate: ['source', 'destination'] }] })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      pagination: {
        page,
        limit,
        total
      },
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await Payment.countDocuments();
    const payments = await Payment.find()
      .populate('user', 'name email')
      .populate('booking', 'bookingId')
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      pagination: {
        page,
        limit,
        total
      },
      data: payments
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBuses = async (req, res, next) => {
  try {
    const data = await Bus.find().sort({ operatorName: 1, busNumber: 1 });
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) { next(error); }
};

export const getAllRoutes = async (req, res, next) => {
  try {
    const data = await Route.find().populate('source').populate('destination').sort({ isPopular: -1 });
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) { next(error); }
};

export const getAllSchedules = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 250);
    const data = await Schedule.find()
      .populate('bus')
      .populate({ path: 'route', populate: ['source', 'destination'] })
      .sort({ travelDate: 1, departureTime: 1 })
      .limit(limit);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) { next(error); }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const data = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) { next(error); }
};
