import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  operatorName: { type: String, required: true },
  busType: { 
    type: String, 
    enum: ['Electric AC Seater', 'AC Sleeper', 'AC Seater', 'Non-AC Seater'], 
    required: true 
  },
  registrationNumber: { type: String, required: true },
  totalSeats: { type: Number, required: true, default: 40 },
  amenities: [{ type: String }],
  rating: { type: Number, min: 0, max: 5, default: 4.6 },
  seatLayout: {
    columns: { type: Number, default: 4 },
    rows: { type: Number },
    layout: { type: String, default: '2+2' }
  },
  status: { type: String, enum: ['active', 'maintenance', 'retired'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

const Bus = mongoose.model('Bus', busSchema);
export default Bus;
