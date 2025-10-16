const EmailService = require('../services/email-service');

const registerEmail = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).send({ error: 'veuillez saisir une addresse e-mail' });
  }
  //générer le code de vérification
  try {
    const verificationCode = EmailService.generateVerificationCode();
    const result = await EmailService.sendVerificationEmail(email, verificationCode);
    return res.status(200).send({ ...result, code: verificationCode });
  } catch (e) {
    res.send({ error: "impossible d'envoyer l'email verification email" });
  }
};
const PaymentEmail = (req, res) => {};

module.exports = { registerEmail, PaymentEmail };
