import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['UPI', 'Card', 'Net Banking'], required: true },
  transactionId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['success', 'failed', 'refunded', 'refund_initiated', 'pending'], default: 'pending' },
  paidAt: { type: Date },
  refundedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
