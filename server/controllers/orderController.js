import asyncHandler from 'express-async-handler';
import Order from "../models/orderModel.js";
// import mailGun from "../utils/mailGun.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/ Any Authorized Person
const addOrderItems = asyncHandler (async (req,res)=>{
  const {orderItems} = req.body;

  if(orderItems && orderItems.length === 0){
    return res.status(400).send({message:"No order items"});
  }else{
    const order= new Order({
      seller: req.body.orderItems[0].seller,
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    })
    const createdOrder = await order.save();
    return res
      .status(201)
      .send({ message: 'New Order Created', order: createdOrder });
  }
})

// @desc    Get order by Id
// @route   GET /api/orders/:id
// @access  Private/ Any Authorized Person
const getOrderById = asyncHandler (async (req,res)=>{
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    return res.send(order);
  } else {
    return res.status(404)
        .send({message:'Order not found'});
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private/ Any Authorized Person
const updateOrderToPaid = asyncHandler (async (req,res)=>{
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();

    // try {
    //   mailGun()
    //     .messages()
    //     .send(
    //       {
    //         from: 'Zephyr <orders@mg.zephyr.com>',
    //         to: `${order.user.name} <${order.user.email}>`,
    //         subject: `New order ${order._id}`,
    //         html: payOrderEmailTemplate(order),
    //       },
    //       (error, body) => {
    //         if (error) {
    //           console.log(error);
    //         } else {
    //           console.log(body);
    //         }
    //       }
    //     );
    // } catch (err) {
    //   console.log(err);
    // }

    return res.send({ message: 'Order Paid', order: updatedOrder });
  } else {
    return res.status(404).send({ message: 'Order Not Found' });
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/ Admin
const updateOrderToDelivered = asyncHandler (async (req,res)=>{
  const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      return res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      return res.status(404).send({ message: 'Order Not Found' });
    }
})

// @desc    Get User's personal orders
// @route   GET /api/orders/myOrders
// @access  Private/ Any Authorized Person
const getMyOrders = asyncHandler (async (req,res)=>{
  const orders = await Order.find({ user: req.user._id });
    return res.send(orders);
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/ Seller or Admin
const getOrders = asyncHandler (async (req,res)=>{
  const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    const orders = await Order.find({ ...sellerFilter }).populate(
      'user',
      'name'
    );
    return res.send(orders);
})

// @desc    Get Summary
// @route   GET /api/orders/summary
// @access  Private/ Admin
const getSummary = asyncHandler (async (req,res)=>{
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);
  const users = await User.aggregate([
    {
      $group: {
        _id: null,
        numUsers: { $sum: 1 },
      },
    },
  ]);
  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        orders: { $sum: 1 },
        sales: { $sum: '$totalPrice' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const productCategories = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);
  return res.send({ users, orders, dailyOrders, productCategories });
})

export{
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    getSummary
  }







