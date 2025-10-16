require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Route = require('./routes/index-route');
const EmailService = require('./services/email-service');

// initialize the app

const app = express();
const PORT = process.env.PORT || 5000;

// initialize the database

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err));

// initialize the global middleware
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./uploads/img/cars'));

//initialisation de la route principale

app.get('/', (req, res) => {
  res.json({
    body: 'Hello World!',
  });
});
// initialisation de routes
app.use(Route);

// initialize the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
