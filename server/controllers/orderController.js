import asyncHandler from 'express-async-handler';
import Order from "../models/orderModel";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/ Any Authorized Person
const addOrderItems = asyncHandler (async (req,res)=>{})

// @desc    Get order by Id
// @route   GET /api/orders/:id
// @access  Private/ Any Authorized Person
const getOrderById = asyncHandler (async (req,res)=>{})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private/ Any Authorized Person
const updateOrderToPaid = asyncHandler (async (req,res)=>{})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/ Admin
const updateOrderToDelivered = asyncHandler (async (req,res)=>{})

// @desc    Get User's personal orders
// @route   GET /api/orders/myOrders
// @access  Private/ Any Authorized Person
const getMyOrders = asyncHandler (async (req,res)=>{})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/ Seller or Admin
const getOrders = asyncHandler (async (req,res)=>{})

// @desc    Get Summary
// @route   GET /api/orders/summary
// @access  Private/ Admin
const getSummary = asyncHandler (async (req,res)=>{})

export{
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    getSummary
  }







