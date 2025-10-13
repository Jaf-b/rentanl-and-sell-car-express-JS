const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  isForSell: {
    type: Boolean,
    required: true,
  },
  ShopID: {
    type: String,
    required: true,
  },
  images: {
    type: [],
    required: true,
  },
  marque: {
    type: String,
    required: true,
  },
  modele: {
    type: String,
    required: true,
  },
  anneeFabrication: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  numeroChassis: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  volant: {
    type: String,
    required: true,
  },
  km: {
    type: String,
    required: true,
  },
  porte: {
    type: String,
    required: true,
  },
  couleur: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Cars', CarSchema);
