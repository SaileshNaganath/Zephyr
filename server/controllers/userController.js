import asyncHandler from 'express-async-handler';
import User from '../models/userModel'; 

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler (async (req,res)=>{})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const signup = asyncHandler (async (req,res)=>{})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/ Admin
const getUsers = asyncHandler (async (req,res)=>{})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private / Any Authorized Person
const getProfile = asyncHandler (async (req,res)=>{})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private / Any Authorized Person
const updateProfile = asyncHandler (async (req,res)=>{})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/ Admin
const getUserById = asyncHandler (async (req,res)=>{})

// @desc    Update user by id
// @route   PUT /api/users/:id
// @access  Private/ Admin
const updateUserById = asyncHandler (async (req,res)=>{})

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @access  Private/ Admin
const deleteUserById = asyncHandler (async (req,res)=>{})

// @desc    Get Top Sellers
// @route   DELETE /api/users/top-sellers
// @access  Public
const getTopSellers = asyncHandler (async (req,res)=>{})

export {
    login,
    signup,
    getUsers,
    getProfile,
    updateProfile,
    getUserById,
    updateUserById,
    deleteUserById,
    getTopSellers
  }





 



