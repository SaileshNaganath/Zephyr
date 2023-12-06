import express from 'express';
import { isAuth,isAdmin,isSellerOrAdmin } from "../middlewares/authMiddleware";

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
  } from '../controllers/userController';

const router = express.Router();


router.route('/')
    .post(signup)
    .get(isAuth, isAdmin, getUsers);

router.post('/login', login);

router.route('/profile')
  .get(isAuth, getProfile)
  .put(isAuth, updateProfile);

router.route('/:id')
  .get(isAuth, isAdmin, getUserById)
  .put(isAuth, isAdmin, updateUserById)
  .delete(isAuth, isAdmin, deleteUserById);

router.route('/top-sellers')
  .get(getTopSellers);

export default router;
