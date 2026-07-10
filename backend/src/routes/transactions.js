const express = require('express');
const Transaction = require('../models/Transaction');
const { authenticate } = require('../middleware/auth');
const crypto = require('crypto');
const router = express.Router();

// Create transaction
router.post('/', authenticate, async (req, res) => {
  try {
    const { amount, sender, receiver, description, timestamp } = req.body;
    
    const transactionId = crypto.randomBytes(16).toString('hex');
    const verificationHash = crypto.createHash('sha256').update(transactionId + amount + timestamp).digest('hex');

    const transaction = new Transaction({
      userId: req.user.id,
      transactionId,
      amount,
      sender,
      receiver,
      description,
      timestamp,
      verificationHash
    });

    await transaction.save();

    res.status(201).json({
      message: 'Transaction created',
      transaction
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions
router.get('/', authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify transaction
router.put('/:id/verify', authenticate, async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { verified: true, status: 'verified' },
      { new: true }
    );
    res.json({ message: 'Transaction verified', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;