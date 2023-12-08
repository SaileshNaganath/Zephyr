import express from "express";
import { isAuth, isAdmin,  isSellerOrAdmin } from "../middlewares/authMiddleware.js";
import {
    getProducts,
    getProductById,
    getCategories,
    getTopProducts,
    createProduct,
    updateProductById,
    deleteProductById,
    createProductReview
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.route('/')
    .get(getProducts)
    .post(isAuth,isSellerOrAdmin,createProduct);

productRouter.route('/categories')
    .get(getCategories);

productRouter.route('/top-Products')
    .get(getTopProducts);

productRouter.route('/:id')
    .get(getProductById)
    .put(isAuth,isSellerOrAdmin,updateProductById)
    .delete(isAuth,isAdmin,deleteProductById);

productRouter.route('/:id/reviews').post(isAuth,createProductReview);

export default productRouter;