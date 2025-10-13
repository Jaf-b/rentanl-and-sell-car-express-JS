const { Router } = require('express');
const {
  GetShopByID,
  AddShop,
  UpdateShop,
  DeleteShop,
  GetShopByUserID,
} = require('../controllers/shop-routes-controllers');
const IsAuthenticated = require('../middleware/isAuthenticated');

const ShopRouter = Router();

ShopRouter.get('/shop/:UserID', IsAuthenticated, GetShopByUserID);
ShopRouter.post('/shop', AddShop);
ShopRouter.put('/shop/:ShopID', IsAuthenticated, UpdateShop);
ShopRouter.delete('/shop/:ShopID', IsAuthenticated, DeleteShop);

module.exports = ShopRouter;
