const express = require('express');
const DigitalSignature = require('../models/DigitalSignature');
const { authenticate } = require('../middleware/auth');
const crypto = require('crypto');
const router = express.Router();

// Generate digital signature
router.post('/sign', authenticate, async (req, res) => {
  try {
    const { transactionId, data } = req.body;

    // Generate signature (mock)
    const signature = crypto.createHash('sha256').update(data + Date.now()).digest('hex');
    const publicKey = crypto.randomBytes(32).toString('hex');

    const digitalSig = new DigitalSignature({
      userId: req.user.id,
      transactionId,
      signature,
      publicKey
    });

    await digitalSig.save();

    res.status(201).json({
      message: 'Digital signature created',
      signature: digitalSig
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify digital signature
router.post('/verify', authenticate, async (req, res) => {
  try {
    const { transactionId } = req.body;

    const signature = await DigitalSignature.findOne({ transactionId });
    if (!signature) {
      return res.status(404).json({ error: 'Signature not found' });
    }

    // Mock verification
    const isValid = signature.signature.length === 64; // SHA256 produces 64 char hex

    res.json({
      message: 'Signature verification completed',
      isValid,
      signature
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;