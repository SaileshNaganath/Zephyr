import express from 'express';
import { isAuth, isAdmin,  isSellerOrAdmin } from "../middlewares/authMiddleware.js";
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    getSummary
  } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.route('/')
    .post(isAuth, addOrderItems)
    .get(isAuth, isSellerOrAdmin, getOrders);

orderRouter.route('/myOrders')
    .get(isAuth, getMyOrders);

orderRouter.route('/:id')
    .get(isAuth, getOrderById);

orderRouter.route('/:id/pay')
    .put(isAuth, updateOrderToPaid);

orderRouter.route('/:id/deliver')
    .put(isAuth, isAdmin, updateOrderToDelivered);

orderRouter.route('/summary')
    .get(isAuth,isAdmin,getSummary);

export default orderRouter;