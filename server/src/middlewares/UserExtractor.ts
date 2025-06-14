// src/middleware/userExtractor.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface DecodedToken {
  userId: string;
  role: string;
}

export const userExtractor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const user = await User.findById(decoded.userId).lean();
    
    if (!user) {
      return next();
    }

    // Type-safe header assignment
    req.headers['x-user-id'] = user._id.toString();
    req.headers['x-user-role'] = user.role;

    next();
  } catch (error) {
    next();
  }
};