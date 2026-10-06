import api from './api';

export const searchSchedules = async (from, to, date, passengers = 1) => {
  const response = await api.get('/schedules/search', { params: { from, to, date, passengers } });
  return response.data;
};

export const getSchedule = async (id) => {
  const response = await api.get(`/schedules/${id}`);
  return response.data;
};

export const getCities = async () => {
  const response = await api.get('/cities');
  return response.data;
};

export const searchCities = async (query) => {
  if (!query || query.length < 2) return { data: [] };
  const response = await api.get('/cities/search', { params: { q: query } });
  return response.data;
};

export const getPopularRoutes = async () => {
  const response = await api.get('/routes/popular');
  return response.data;
};
