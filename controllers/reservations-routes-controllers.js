const Reservation = require('../models/reservations-model');
const Car = require('../models/cars-model');

const GetReservationByShopID = async (req, res) => {
  try {
    const { shopID } = req.params;
    const reservations = await Reservation.find({ ShopID: shopID });
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this shop.' });
    }
    
    const carIDs = reservations.map(reservation => reservation.CarID);
    
    const cars = await Car.find({ '_id': { $in: carIDs } });
    
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetReservationByUserId = async (req, res) => {
  try {
    const { userID } = req.params;
    const reservations = await Reservation.find({ UserID: userID });
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this user.' });
    }
    
    const carIDs = reservations.map(reservation => reservation.CarID);
    
    const cars = await Car.find({ '_id': { $in: carIDs } });
    
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AddReservation = async (req, res) => {
  try {
    const { UserID, CarID, ShopID } = req.body;
    const newReservation = new Reservation({
      UserID,
      CarID,
      ShopID,
    });
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteReservation = async (req, res) => {
  try {
    const { ReservationID } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(ReservationID);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }
    res.status(200).json({ message: 'Reservation deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetReservationByShopID,
  GetReservationByUserId,
  AddReservation,
  UpdateReservation,
  DeleteReservation,
};
