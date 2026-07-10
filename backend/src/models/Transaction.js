const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transactionId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  timestamp: { type: Date, required: true },
  verified: { type: Boolean, default: false },
  verificationHash: { type: String },
  digitalSignature: { type: String },
  faceMatch: { type: Boolean, default: false },
  faceMatchScore: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);