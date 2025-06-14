import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../errors/unAuthenticatedError";

// Define the JWT payload interface
interface JwtPayload {
  userId: string;
  role: string;
  // Add other properties your JWT might contain
}

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return next(new UnAuthenticatedError("Access Denied. No token provided."));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    // Attach user to request
    req.user = decoded;
    
    next();
  } catch (error) {
    // Handle different JWT error types
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnAuthenticatedError("Access Denied. Token expired."));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnAuthenticatedError("Access Denied. Invalid token."));
    }
    
    // Generic error fallback
    return next(new UnAuthenticatedError("Access Denied. Authentication failed."));
  }
};

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return next(new UnAuthenticatedError(`Access Denied. Requires ${role} role.`));
    }
    next();
  };
};