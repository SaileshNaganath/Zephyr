import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler (async (req,res)=>{

  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;
  const name = req.query.name || '';
  const category = req.query.category || '';
  const seller = req.query.seller || '';
  const order = req.query.order || '';
  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const rating =
    req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;

  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  const sellerFilter = seller ? { seller } : {};
  const categoryFilter = category ? { category } : {};
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};

  const sortOrder = order === 'lowest' ? { price: 1 } : order === 'highest'
                                       ? { price: -1 } : order === 'toprated'
                                       ? { rating: -1 } : { _id: -1 };
  const count = await Product.countDocuments({ ...sellerFilter, ...nameFilter, ...categoryFilter, ...priceFilter, ...ratingFilter});
  const products = await Product.find({ ...sellerFilter, ...nameFilter, ...categoryFilter, ...priceFilter, ...ratingFilter })
                                .populate({path:'seller',select: 'seller.name seller.logo'})
                                .sort(sortOrder)
                                .skip(pageSize * (page - 1))
                                .limit(pageSize);
  
  return res.send({ products, page, pages: Math.ceil(count / pageSize) });
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler (async (req,res)=>{
    const product = await Product.findById(req.params.id).populate(
        'seller',
        'seller.name seller.logo seller.rating seller.numReviews'
      );
      if (product) {
        return res.send(product);
      } else {
        return res.status(404).send({ message: 'Product Not Found' });
      }
})

// @desc    Fetch product by category
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler (async (req,res)=>{
    const categories = await Product.find().distinct('category');
    return res.send(categories);
})

// @desc    Fetch top products
// @route   GET /api/top-Products
// @access  Public
const getTopProducts = asyncHandler (async (req,res)=>{
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    return res.json(products);
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/ Seller or Admin
const createProduct = asyncHandler (async (req,res)=>{
  const product = new Product({
    name:'Sample Name' + Date.now(),
    seller: req.user._id,
    image:'/images/sample.jpg',
    price:0,
    category:'Sample Category',
    brand:'Sample Brand',
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    description: 'Sample Description',
  });
  const createdProduct = await product.save();
  return res.status(201).send({message:'Product Created', product: createdProduct });
})

// @desc    Update product by id
// @route   PUT /api/products/:id
// @access  Private/ Seller or Admin
const updateProductById = asyncHandler (async (req,res)=>{
  const product = await Product.findById(req.params.id);
  if(product){
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    return res.status(201).send({ message: 'Product Updated', product: updatedProduct });
  } else {
    return res.status(404).send({ message: 'Product Not Found' });
  }
})

// @desc    Delete product bu id
// @route   DELETE /api/products/:id
// @access  Private/ Admin
const deleteProductById = asyncHandler (async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
       const deleteProduct = await product.remove();
       return res.send({ message: 'Product Deleted', product: deleteProduct });
    }else {
        return res.status(404).send({ message: 'Product Not Found' });
      }
    
})

// @desc    Create Product Review
// @route   POST /api/products/:id/reviews
// @access  Private / Any Authorized Person
const createProductReview = asyncHandler (async (req,res)=>{
  const product =await Product.findById(req.params.id);
  if(product){
    const alreadyReviewed = product.reviews.find(
      (r)=> r.user.toString() === req.user._id.toString()
    )

    if(alreadyReviewed){
      return res.status(400)
          .send({message:'Product has been already reviewed'});
    }

    const review={
      user : req.user._id,
      name : req.user.name,
      rating:Number(req.body.rating),
      comment:req.body.comment
    }

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

      await product.save()
      return res.status(201).send({ message: 'Review added' });
  }else {
    return res.status(404).send('Product not found');
  }
})


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







