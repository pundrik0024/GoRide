import dotenv from 'dotenv';
import mongoose from 'mongoose';
import City from '../models/City.js';
import Route from '../models/Route.js';
import Bus from '../models/Bus.js';
import Schedule from '../models/Schedule.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Review from '../models/Review.js';
import Notification from '../models/Notification.js';

import { cities } from './cities.js';
import { getRoutes } from './routes.js';
import { buses } from './buses.js';
import { getSchedules } from './schedules.js';
import { users } from './users.js';
import { getBookings } from './bookings.js';
import { getReviews } from './reviews.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding');

    await City.deleteMany();
    await Route.deleteMany();
    await Bus.deleteMany();
    await Schedule.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();
    await Payment.deleteMany();
    await Review.deleteMany();
    await Notification.deleteMany();
    console.log('Cleared existing data');

    const createdCities = await City.insertMany(cities);
    const cityMap = {};
    createdCities.forEach(c => cityMap[c.name] = c._id);
    
    const routes = getRoutes(cityMap);
    const createdRoutes = await Route.insertMany(routes);
    const routeMap = {};
    createdRoutes.forEach((r, i) => routeMap[`route_${i}`] = r._id);
    
    const createdBuses = await Bus.insertMany(buses);
    const busMap = {};
    createdBuses.forEach((b, i) => busMap[`bus_${i}`] = b._id);
    
    const schedules = getSchedules(createdRoutes, createdBuses);
    const createdSchedules = await Schedule.insertMany(schedules);
    
    const createdUsers = [];
    for (let userData of users) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }
    
    const bookings = getBookings(createdUsers, createdSchedules, createdRoutes);
    await Schedule.bulkWrite(createdSchedules.map(schedule => ({
      updateOne: {
        filter: { _id: schedule._id },
        update: { $set: { bookedSeats: schedule.bookedSeats, availableSeats: schedule.availableSeats } }
      }
    })));
    const createdBookings = await Booking.insertMany(bookings);
    
    const reviews = getReviews(createdUsers, createdRoutes);
    await Review.insertMany(reviews);

    const payments = createdBookings.map(b => ({
      booking: b._id,
      user: b.user,
      amount: b.totalAmount,
      method: 'UPI',
      transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'success',
      paidAt: new Date()
    }));
    await Payment.insertMany(payments);

    console.log('Seeding completed successfully!');
    console.log(`Cities: ${createdCities.length}`);
    console.log(`Routes: ${createdRoutes.length}`);
    console.log(`Buses: ${createdBuses.length}`);
    console.log(`Schedules: ${createdSchedules.length}`);
    console.log(`Users: ${createdUsers.length}`);
    console.log(`Bookings: ${createdBookings.length}`);
    console.log(`Reviews: ${reviews.length}`);
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
