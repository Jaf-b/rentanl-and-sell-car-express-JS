const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  CarID: {
    type: String,
    required: true,
  },
  Payment: {
    type: String,
    required: true,
  },
  ReservedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
