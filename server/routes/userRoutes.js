import express from 'express';
import { isAuth,isAdmin,isSellerOrAdmin } from "../middlewares/authMiddleware.js";

import {
    login,
    signup,
    getUsers,
    getProfile,
    updateProfile,
    getUserById,
    updateUserById,
    deleteUserById,
    getTopSellers
  } from '../controllers/userController.js';

const userRouter = express.Router();


userRouter.route('/')
    .get(isAuth, isAdmin, getUsers);

userRouter.route('/register')
    .post(signup);

userRouter.route('/signin')
    .post(login);

userRouter.route('/profile')
  .get(isAuth, getProfile)
  .put(isAuth, updateProfile);

userRouter.route('/:id')
  .get(isAuth, isAdmin, getUserById)
  .put(isAuth, isAdmin, updateUserById)
  .delete(isAuth, isAdmin, deleteUserById);

userRouter.route('/top-sellers')
  .get(getTopSellers);

export default userRouter;
