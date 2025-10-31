require('dotenv').config();
const axios = require('axios');

const paymentAPI = axios.create({
  baseURL: `${process.env.LYGOS_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.LYGOS_API_KEY,
  },
});

module.exports = paymentAPI;
