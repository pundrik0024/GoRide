import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  code: { type: String },
  isPopular: { type: Boolean, default: false },
  boardingPoints: [{
    name: String,
    address: String,
    landmark: String
  }]
});

citySchema.index({ name: 'text' });

const City = mongoose.model('City', citySchema);
export default City;
