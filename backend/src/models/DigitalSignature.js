const mongoose = require('mongoose');

const digitalSignatureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transactionId: { type: String, required: true },
  signature: { type: String, required: true },
  publicKey: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('DigitalSignature', digitalSignatureSchema);