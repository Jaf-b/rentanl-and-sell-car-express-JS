const { Router } = require('express');
const {
  LoginPost,
  RegistrationPost,
  LogoutPost,
} = require('../controllers/authentication-controllers');
const { uploadOneImg } = require('../middleware/upload-image');

const AuthRoute = Router();

AuthRoute.post('/login', LoginPost);
AuthRoute.post('/registration', RegistrationPost, uploadOneImg);
AuthRoute.post('/logout', LogoutPost);

module.exports = AuthRoute;
