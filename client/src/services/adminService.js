import api from './api';

export const getDashboard = async () => (await api.get('/admin/dashboard')).data;

export const getBuses = async () => (await api.get('/admin/buses')).data;
export const createBus = async (data) => (await api.post('/admin/buses', data)).data;
export const updateBus = async (id, data) => (await api.put(`/admin/buses/${id}`, data)).data;
export const deleteBus = async (id) => (await api.delete(`/admin/buses/${id}`)).data;

export const getRoutes = async () => (await api.get('/admin/routes')).data;
export const createRoute = async (data) => (await api.post('/admin/routes', data)).data;
export const updateRoute = async (id, data) => (await api.put(`/admin/routes/${id}`, data)).data;
export const deleteRoute = async (id) => (await api.delete(`/admin/routes/${id}`)).data;

export const getSchedules = async () => (await api.get('/admin/schedules')).data;
export const createSchedule = async (data) => (await api.post('/admin/schedules', data)).data;
export const updateSchedule = async (id, data) => (await api.put(`/admin/schedules/${id}`, data)).data;
export const deleteSchedule = async (id) => (await api.delete(`/admin/schedules/${id}`)).data;

export const getBookings = async (params) => (await api.get('/admin/bookings', { params })).data;
export const getUsers = async (params) => (await api.get('/admin/users', { params })).data;
export const getPayments = async (params) => (await api.get('/admin/payments', { params })).data;
