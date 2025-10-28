const { Router } = require('express');
const {
  LoginPost,
  RegistrationPost,
  LogoutPost,
} = require('../controllers/authentication-controllers');
const { uploadOneImg } = require('../middleware/upload-image');
const generateValidationCode = require('../helper/generate-validation-code');
const { sendVerificationEmail } = require('../config/email-config');

const AuthRoute = Router();
AuthRoute.post('/code/validation',async (req, res) => {
  const email = req.body.email;
  const code = generateValidationCode();
  await sendVerificationEmail("jafredbukulu@gmail.com",code)
  res.json(code)

})
AuthRoute.post('/login', LoginPost);
AuthRoute.post('/registration', RegistrationPost);
AuthRoute.post('/logout', LogoutPost);

module.exports = AuthRoute;
