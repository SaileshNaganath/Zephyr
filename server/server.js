import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import Product from './models/productModel.js';
import User from './models/userModel.js';
import data from './data/data.js';

import {notFound, errorHandler} from './middlewares/errorMiddleware.js';


import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";

import serverConfig from './configs/serverConfig.js';

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI || 'mongodb://localhost/zephyr',init())
	.then(() => console.log('DB connected'))
	.catch((error) => console.error(error));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

async function init(){
  try{
    await Product.deleteMany({});
    await User.deleteMany({});
   
    await Product.insertMany(data.products);
    await User.insertMany(data.users);
    console.log("Application is working successfully");  
  }catch(err){
    console.log(err);
    console.log("Application is crashed");
  }
}

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound);
app.use(errorHandler);


app.listen(
    serverConfig.PORT, ()=>{
        console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${serverConfig.PORT}`
      )}
    
  )