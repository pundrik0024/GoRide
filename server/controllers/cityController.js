import City from '../models/City.js';

export const getCities = async (req, res, next) => {
  try {
    const { popular } = req.query;
    let query = {};
    
    if (popular === 'true') {
      query.isPopular = true;
    }

    const cities = await City.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities
    });
  } catch (error) {
    next(error);
  }
};

export const searchCities = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ success: false, message: 'Please provide a search query' });
    }

    const cities = await City.find({
      name: { $regex: q, $options: 'i' }
    }).limit(10);

    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities
    });
  } catch (error) {
    next(error);
  }
};
