import express from "express";
import { isAuth, isAdmin,  isSellerOrAdmin } from "../middlewares/authMiddleware";
import {
    getProducts,
    getProductById,
    getCategories,
    getTopProducts,
    createProduct,
    updateProductById,
    deleteProductById,
    createProductReview
} from '../controllers/productController';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(isAuth,isSellerOrAdmin,createProduct);

router.route('/categories')
    .get(getCategories);

router.route('/top-Products')
    .get(getTopProducts);

router.route('/:id')
    .get(getProductById)
    .put(isAuth,isSellerOrAdmin,updateProductById)
    .delete(isAuth,isAdmin,deleteProductById);

router.route('/:id/reviews').post(isAuth,createProductReview);

export default router;