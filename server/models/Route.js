import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  source: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  distance: { type: Number },
  estimatedDuration: { type: String },
  estimatedMinutes: { type: Number },
  boardingPoints: [{ name: String, address: String, timing: String }],
  droppingPoints: [{ name: String, address: String, timing: String }],
  isPopular: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const Route = mongoose.model('Route', routeSchema);
export default Route;
