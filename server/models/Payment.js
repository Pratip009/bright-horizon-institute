const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuickProgram', // Assuming you have a QuickProgram model based on your API
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  paypalOrderId: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending', // pending, completed, failed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);