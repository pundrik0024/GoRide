import Route from '../models/Route.js';

export const getRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find({ status: 'active' })
      .populate('source')
      .populate('destination');

    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes
    });
  } catch (error) {
    next(error);
  }
};

export const getPopularRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find({ isPopular: true, status: 'active' })
      .populate('source')
      .populate('destination');

    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes
    });
  } catch (error) {
    next(error);
  }
};

export const searchRoutes = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    
    let query = { status: 'active' };
    
    if (from) query.source = from;
    if (to) query.destination = to;

    const routes = await Route.find(query)
      .populate('source')
      .populate('destination');

    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes
    });
  } catch (error) {
    next(error);
  }
};

export const createRoute = async (req, res, next) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json({ success: true, data: route });
  } catch (error) {
    next(error);
  }
};

export const updateRoute = async (req, res, next) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });
    res.status(200).json({ success: true, data: route });
  } catch (error) {
    next(error);
  }
};

export const deleteRoute = async (req, res, next) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
