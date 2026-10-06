import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  passengers: [{
    name: String,
    age: Number,
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    phone: String,
    email: String,
    seatNumber: String
  }],
  seats: [{ type: String }],
  boardingPoint: { name: String, address: String, timing: String },
  droppingPoint: { name: String, address: String, timing: String },
  fare: { type: Number },
  baseFare: { type: Number },
  taxes: { type: Number },
  tax: { type: Number },
  convenienceFee: { type: Number, default: 25 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number },
  travelDate: { type: Date },
  departureTime: { type: String },
  arrivalTime: { type: String },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'refunded', 'refund_initiated', 'failed'],
    default: 'pending' 
  },
  bookingStatus: { 
    type: String, 
    enum: ['confirmed', 'cancelled', 'completed', 'pending'], 
    default: 'pending' 
  },
  cancelledAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
