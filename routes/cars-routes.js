const { Router } = require('express');
const {
  GetCar,
  AddCar,
  UpdateCar,
  DeleteCar,
  GetCarById,
  GetCarByShopID,
} = require('../controllers/car-routes-controllers');
const { uploadImage } = require('../middleware/upload-image');
const IsAuthenticated = require('../middleware/isAuthenticated');

const CarRoute = Router();

CarRoute.get('/car', GetCar);
CarRoute.get('/car/:CarID', GetCarById);
CarRoute.get('/car/shop/:ShopID', IsAuthenticated, GetCarByShopID);
CarRoute.post('/car', IsAuthenticated, uploadImage, AddCar);
CarRoute.put('/car/:CarID', IsAuthenticated, UpdateCar);
CarRoute.delete('/car/:CarID', IsAuthenticated, DeleteCar);

module.exports = CarRoute;
