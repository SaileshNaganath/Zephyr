import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const isAuth = asyncHandler(async(req,res,next) => {
  
    const authorizationHeader = req.headers.authorization;
    
    if(authorizationHeader && authorizationHeader.startsWith('Bearer')){
        try{
            let token = authorizationHeader.split(" ")[1];
            const decoded = jwt.verify(token ,process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        }
        
        catch(err){
            return res.status(401).send({
                message:"Token Failed!"
            })

        }
    }else{
        return res.status(401).send({
            message:"No Token Provided!"
        })
    }

});

export const isAdmin = (req,res,next) =>{
    if (req.user && req.user.isAdmin) {
        next();
      } else {
        return res.status(401).send({ message: 'Invalid Admin Token' });
      }
} ;

export const isSeller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
      next();
    } else {
      return res.status(401).send({ message: 'Invalid Seller Token' });
    }
  };
  
export const isSellerOrAdmin = (req,res,next) =>{
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
        next();
      } else {
        return res.status(401).send({ message: 'Invalid Admin/Seller Token' });
      }
} ;

