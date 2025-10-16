const express = require('express');
const router = express.Router();
const CarRoute = require('./cars-routes');
const AuthRoute = require('./authentication-routes');
const ReservationRoutes = require('./reservations-routes');
const UserRoutes = require('./users-routes');
const ShopRouter = require('./shop-routes');
const EmailRoute = require('./email-routes');
router.use(AuthRoute);
router.use(CarRoute);
router.use(ReservationRoutes);
router.use(UserRoutes);
router.use(ShopRouter);
router.use(EmailRoute);

module.exports = router;
