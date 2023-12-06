import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler (async (req,res)=>{})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler (async (req,res)=>{})

// @desc    Fetch product by category
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler (async (req,res)=>{})

// @desc    Fetch top products
// @route   GET /api/top-Products
// @access  Public
const getTopProducts = asyncHandler (async (req,res)=>{})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/ Seller or Admin
const createProduct = asyncHandler (async (req,res)=>{})

// @desc    Update product by id
// @route   PUT /api/products/:id
// @access  Private/ Seller or Admin
const updateProductById = asyncHandler (async (req,res)=>{})

// @desc    Delete product bu id
// @route   DELETE /api/products/:id
// @access  Private/ Admin
const deleteProductById = asyncHandler (async (req,res)=>{})

// @desc    Create Product Review
// @route   POST /api/products/:id/reviews
// @access  Private / Any Authorized Person
const createProductReview = asyncHandler (async (req,res)=>{})


export {
    getProducts,
    getProductById,
    getCategories,
    getTopProducts,
    createProduct,
    updateProductById,
    deleteProductById,
    createProductReview
};







