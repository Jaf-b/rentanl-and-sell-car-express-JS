const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  ShopName: {
    type: String,
  },
  Description: {
    type: String,
  },
  employee: {
    type: [],
  },
});

module.exports = mongoose.model('Shop', ShopSchema);
