import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  travelDate: { type: Date, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  fare: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  bookedSeats: [{ type: String }],
  boardingPoints: [{ name: String, address: String, timing: String }],
  droppingPoints: [{ name: String, address: String, timing: String }],
  status: { 
    type: String, 
    enum: ['scheduled', 'boarding', 'departed', 'arrived', 'cancelled'], 
    default: 'scheduled' 
  },
  createdAt: { type: Date, default: Date.now }
});

scheduleSchema.index({ travelDate: 1, route: 1 });

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;
