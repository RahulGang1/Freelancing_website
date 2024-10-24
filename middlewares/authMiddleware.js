import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
  
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);
  
        // Find user and attach to request
        req.user = await User.findById(decoded.id).select('-password');
        console.log('Authenticated user:', req.user);
  
        if (!req.user) {
          res.status(401);
          throw new Error('Not authorized, user not found');
        }
  
        next();
      } catch (error) {
        console.error('Error during token verification:', error);
        res.status(401).json({ message: 'Not authorized, invalid token' });
      }
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  });
  