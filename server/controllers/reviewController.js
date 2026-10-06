import Review from '../models/Review.js';

export const createReview = async (req, res, next) => {
  try {
    const { route, booking, rating, comment } = req.body;

    const existingReview = await Review.findOne({ booking, user: req.user._id });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'Review already submitted for this booking' });
    }

    const review = await Review.create({
      user: req.user._id,
      route,
      booking,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name')
      .populate({ path: 'route', populate: ['source', 'destination'] })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

export const getRouteReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ route: req.params.routeId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};
