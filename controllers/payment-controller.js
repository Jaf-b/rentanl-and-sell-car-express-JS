const { v4: uuidv4 } = require('uuid');
const paymentAPI = require('../config/axios');
const Reservation = require('../models/reservations-model');
const Car = require('../models/cars-model');
const User = require('../models/User-model');

const initPayment = async (req, res) => {
  try {
    const { amount, carId } = req.body;
    const userId = req.user.UserID;

    if (!amount || !userId || !carId) {
      return res.status(400).json({ message: 'amount, userId et carId sont requis.' });
    }

    const user = await User.findById(userId);
    const car = await Car.findById(carId);

    if (!user || !car) {
      return res.status(404).json({ message: 'Utilisateur ou voiture introuvable.' });
    }

    const orderId = uuidv4();

    const payload = {
      amount: parseInt(amount),
      shop_name: 'AutoExpress - Bukavu',
      message: 'Merci pour votre achat via AutoExpress.',
      success_url: `${process.env.BASE_URL_FRONTEND}/payment/success`,
      failure_url: `${process.env.BASE_URL_FRONTEND}/payment/failure`,
      order_id: orderId,
    };

    const response = await paymentAPI.post('/gateway', payload);

    if (!response.data || !response.data.link) {
      return res.status(400).json({
        message: 'Erreur lors de la création du paiement.',
        details: response.data,
      });
    }

    const reservation = new Reservation({
      UserID: userId,
      CarID: carId,
      ShopID: car.ShopID,
      ReservedAt: new Date(),
    });
    await reservation.save();

    return res.status(200).json({
      message: 'Paiement initialisé avec succès',
      paymentLink: response.data.link,
      orderId,
      reservation,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur serveur',
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { initPayment };
