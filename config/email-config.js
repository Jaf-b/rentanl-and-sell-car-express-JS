const nodemailer = require('nodemailer');

//configuration du transporteur (exemple gmail)

const transporteur = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'api',
    pass: 'f979e758bfcbf4222e4170a171240787',
  },
});

module.exports = transporteur;
