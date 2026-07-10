const express = require('express');
const { authenticate } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Verify face (mock implementation)
router.post('/verify-face', authenticate, async (req, res) => {
  try {
    const { transactionId, faceImage } = req.body;

    if (!transactionId || !faceImage) {
      return res.status(400).json({ error: 'Transaction ID and face image required' });
    }

    // Mock face verification - in production use a real face recognition API
    const mockMatchScore = Math.random() * 100;
    const faceMatch = mockMatchScore > 70;

    const transaction = await Transaction.findByIdAndUpdate(
      transactionId,
      {
        faceMatch,
        faceMatchScore: Math.round(mockMatchScore * 100) / 100
      },
      { new: true }
    );

    res.json({
      message: 'Face verification completed',
      faceMatch,
      matchScore: transaction.faceMatchScore,
      transaction
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;