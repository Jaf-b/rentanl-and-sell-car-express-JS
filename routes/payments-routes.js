const express = require('express');
const router = express.Router();
const IsAuthenticated = require('../middleware/isAuthenticated');
const { initPayment } = require('../controllers/payment-controller');

router.post('/create', IsAuthenticated, initPayment);

module.exports = router;
