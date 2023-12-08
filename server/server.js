import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';



import {notFound, errorHandler} from './middlewares/errorMiddleware.js';

import seedRouter from './routes/seedRoutes.js';
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";

import serverConfig from './configs/serverConfig.js';

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('DB connected'))
	.catch((error) => console.error(error));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/seed',seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

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