// src/controllers/userController.ts
import { RequestHandler } from 'express';
import { User } from '../models/User';
import BadRequestError from '../errors/badRequestError';
import NotFoundError from '../errors/notFoundError';

interface UserQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  role?: string;
}

const VALID_ROLES = ['officer', 'supervisor', 'admin', 'citizen'];

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const { page = '1', limit = '10', search, role } = req.query as UserQueryParams;

    // Validation logic...
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    if (isNaN(pageNum)) throw new BadRequestError("Invalid page number");
    if (isNaN(limitNum)) throw new BadRequestError("Invalid limit value");
    if (role && !VALID_ROLES.includes(role)) {
      throw new BadRequestError(`Invalid role. Valid roles are: ${VALID_ROLES.join(', ')}`);
    }

    // Query building...
    const query: any = {};
    if (role) query.role = role;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      User.countDocuments(query)
    ]);

    if (users.length === 0) {
      throw new NotFoundError("No users found");
    }

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: users
    });

  } catch (error) {
    next(error); // Pass errors to Express error handler
  }
};