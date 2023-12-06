import express from 'express';
import { isAuth, isAdmin,  isSellerOrAdmin } from "../middlewares/authMiddleware";
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    getSummary
  } from '../controllers/orderController';

const router = express.Router();

router.route('/')
    .post(isAuth, addOrderItems)
    .get(isAuth, isSellerOrAdmin, getOrders);

router.route('/myOrders')
    .get(isAuth, getMyOrders);

router.route('/:id')
    .get(isAuth, getOrderById);

router.route('/:id/pay')
    .put(isAuth, updateOrderToPaid);

router.route('/:id/deliver')
    .put(isAuth, isAdmin, updateOrderToDelivered);

router.route('/summary')
    .get(isAuth,isAdmin,getSummary);

export default router;