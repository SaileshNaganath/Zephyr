import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'; 

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler (async (req,res)=>{
  const user = await User.findOne({email:req.body.email});

  if(user){
    if(bcrypt.compareSync(req.body.password,user.password)){
      res.send({
        _id:user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(user._id),
      })
      return;
    }
  }
  res.status(401).send({ message: 'Invalid email or password' });
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const signup = asyncHandler (async (req,res)=>{

  const userExists = await User.findOne({email:req.body.email});
  if(userExists){
    res.status(400)
      .send({message:"User already exist"});
  }

  const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
  });

  const createdUser = await user.save();
  if (createdUser) {
    res.status(201).send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
      .send({message:'Invalid user data'})
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/ Admin
const getUsers = asyncHandler (async (req,res)=>{
  const users = await User.find({});
  res.send(users);
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private / Any Authorized Person
const getProfile = asyncHandler (async (req,res)=>{
  const user = await User.findById(req.user._id);

  if(user){
    res.status(201).send(user);
  }else{
    res.status(404).send({message:"User not found"});
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private / Any Authorized Person
const updateProfile = asyncHandler (async (req,res)=>{
  const user = await User.findById(req.user._id);
  if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.status(200).send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: updatedUser.isSeller,
        token: generateToken(updatedUser._id),
      });
  }
  res.status(404).send({message:'User not found'});
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/ Admin
const getUserById = asyncHandler (async (req,res)=>{
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.status(201).send(user);
  } else {
    res.status(404).send({message:'User not found'})
  }
})

// @desc    Update user by id
// @route   PUT /api/users/:id
// @access  Private/ Admin
const updateUserById = asyncHandler (async (req,res)=>{
  const user = await User.findById(req.params.id);
  if (user) {

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isSeller = Boolean(req.body.isSeller);
    user.isAdmin = Boolean(req.body.isAdmin);
 
    const updatedUser = await user.save();

    res.status(201).send({ message: 'User Updated', user: updatedUser });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
})

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @access  Private/ Admin
const deleteUserById = asyncHandler (async (req,res)=>{
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.status(201).send({ message: 'User has been removed' });
  } else {
    res.status(404).send({message:'User not found'});
  }
})

// @desc    Get Top Sellers
// @route   GET /api/users/top-sellers
// @access  Public
const getTopSellers = asyncHandler (async (req,res)=>{
  const topSellers = await User.find({ isSeller: true })
  .sort({ 'seller.rating': -1 })
  .limit(3);
res.status(201).send(topSellers);
})

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





 



