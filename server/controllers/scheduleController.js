import Schedule from '../models/Schedule.js';
import City from '../models/City.js';
import Route from '../models/Route.js';

export const searchSchedules = async (req, res, next) => {
  try {
    const { from, to, date } = req.query;
    const passengerCount = Math.max(1, Math.min(8, Number(req.query.passengers) || 1));

    if (!from || !to || !date) {
      return res.status(400).json({ success: false, message: 'Please provide from, to, and date parameters' });
    }

    const escapedFrom = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedTo = to.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const fromCity = await City.findOne({ name: new RegExp('^' + escapedFrom + '$', 'i') });
    const toCity = await City.findOne({ name: new RegExp('^' + escapedTo + '$', 'i') });

    if (!fromCity || !toCity) {
      return res.status(404).json({ success: false, message: 'City not found' });
    }

    const routes = await Route.find({
      source: fromCity._id,
      destination: toCity._id,
      status: 'active'
    });

    const routeIds = routes.map(r => r._id);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
      return res.status(400).json({ success: false, message: 'Please provide a valid travel date' });
    }
    const [year, month, day] = date.split('-').map(Number);
    const searchDate = new Date(year, month - 1, day);
    const nextDate = new Date(searchDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const schedules = await Schedule.find({
      route: { $in: routeIds },
      travelDate: {
        $gte: searchDate,
        $lt: nextDate
      },
      status: { $in: ['scheduled', 'boarding'] },
      availableSeats: { $gte: passengerCount }
    })
    .populate('bus')
    .populate({
      path: 'route',
      populate: [
        { path: 'source' },
        { path: 'destination' }
      ]
    })
    .sort({ departureTime: 1 });

    res.status(200).json({
      success: true,
      count: schedules.length,
      data: schedules
    });

  } catch (error) {
    next(error);
  }
};

export const getSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('bus')
      .populate({
        path: 'route',
        populate: [
          { path: 'source' },
          { path: 'destination' }
        ]
      });

    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    res.status(200).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    next(error);
  }
};

export const createSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json({ success: true, data: schedule });
  } catch (error) {
    next(error);
  }
};

export const updateSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!schedule) return res.status(404).json({ success: false, message: 'Schedule not found' });
    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ success: false, message: 'Schedule not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
