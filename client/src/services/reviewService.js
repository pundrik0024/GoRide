import api from './api';

export const getReviews = async () => {
  const response = await api.get('/reviews');
  return response.data;
};

export const getRouteReviews = async (routeId) => {
  const response = await api.get(`/reviews/route/${routeId}`);
  return response.data;
};

export const createReview = async (data) => {
  const response = await api.post('/reviews', data);
  return response.data;
};
