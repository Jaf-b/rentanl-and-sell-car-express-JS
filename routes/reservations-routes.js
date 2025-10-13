const { Router } = require('express');
const {
  GetReservation,
  AddReservation,
  UpdateReservation,
  DeleteReservation,
} = require('../controllers/reservations-routes-controllers');
const IsAuthenticated = require('../middleware/isAuthenticated');
const ReservationRoutes = Router();

ReservationRoutes.get('/reservation', IsAuthenticated, GetReservation);
ReservationRoutes.get('/reservation/:ReservationID', IsAuthenticated, GetReservation);
ReservationRoutes.post('/reservation/:ReservationID', IsAuthenticated, AddReservation);
ReservationRoutes.put('/reservation/:ReservationID', IsAuthenticated, UpdateReservation);
ReservationRoutes.delete('/reservation/:ReservationID', IsAuthenticated, DeleteReservation);

module.exports = ReservationRoutes;
