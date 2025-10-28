const { Router } = require('express');
const {
  AddReservation,
  UpdateReservation,
  DeleteReservation, GetReservationByShopID, GetReservationByUserId,
} = require('../controllers/reservations-routes-controllers');
const IsAuthenticated = require('../middleware/isAuthenticated');
const ReservationRoutes = Router();

ReservationRoutes.get('/reservation/shop/:ShopID', GetReservationByShopID);
ReservationRoutes.get('/reservation/user/:UserID', GetReservationByUserId);
ReservationRoutes.post('/reservation/', AddReservation);
ReservationRoutes.put('/reservation/:ReservationID', IsAuthenticated, UpdateReservation);
ReservationRoutes.delete('/reservation/:ReservationID', IsAuthenticated, DeleteReservation);

module.exports = ReservationRoutes;
