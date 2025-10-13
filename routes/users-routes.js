const { Router } = require('express');
const {
  GetAllUser,
  GetUserById,
  AddUser,
  UpdateUser,
  DeleteUser,
} = require('../controllers/user-routes-controllers');
const IsAuthenticated = require('../middleware/isAuthenticated');

const UserRoutes = Router();

UserRoutes.get('/user', IsAuthenticated, GetAllUser);
UserRoutes.get('/user/:UserID', IsAuthenticated, GetUserById);
UserRoutes.post('/user/:UserID', IsAuthenticated, AddUser);
UserRoutes.put('/user/:UserID', IsAuthenticated, UpdateUser);
UserRoutes.delete('/user/:UserID', IsAuthenticated, DeleteUser);

module.exports = UserRoutes;
