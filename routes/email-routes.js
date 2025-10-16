const { Router } = require('express');
const { registerEmail, PaymentEmail } = require('../controllers/email-routes-controllers');

const EmailRouter = Router();

EmailRouter.post('/email/register', registerEmail);
EmailRouter.get('/email/register', (req, res) => {
  res.json({ message: 'Email already registered' });
});
EmailRouter.post('email/payment', PaymentEmail);

module.exports = EmailRouter;
