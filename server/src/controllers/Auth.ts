import { NextFunction, Request, Response } from 'express';
import badRequestError from '../errors/badRequestError';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const validateRole = async (req: Request, res: Response, next: NextFunction) => {
  const { role, rank, assigned } = req.body;
  
  if (['supervisor', 'officer'].includes(role)) {
    if (!rank || !assigned) {
      throw new badRequestError('Rank and assigned are required for this role');
    }
  } else if (rank || assigned) {
    throw new badRequestError('Rank and assigned are only for officers/supervisors');
  }
  
  next();
};

export const register = [
  validateRole,
  async (req: Request, res: Response) => {
    const { email, fullName, password, role, rank, assigned } = req.body;

    if (!email || !fullName || !password || !role) {
      throw new badRequestError('All fields are required for registration.');
    }

    const userExists = await User.findOne({ email });
    if (userExists) throw new badRequestError('Email already in use.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData: any = {
      email,
      fullName,
      password: hashedPassword,
      role,
    };

    if (['supervisor', 'officer'].includes(role)) {
      userData.rank = rank;
      userData.assigned = assigned;
    }

    const user = await User.create(userData);
    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY!,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  }
];

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    throw new badRequestError('Email and password are required.');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new badRequestError('Invalid credentials. Please check your login details and try again.');
  }

  if (user.role === 'officer' && req.body.role === 'citizen') {
    throw new badRequestError('Invalid credentials. Please check your login details and try again.');
  }

  if (user.role !== req.body.role ) {
    throw new badRequestError('Invalid credentials. Please check your login details and try again.');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new badRequestError('Invalid credentials. Please check your login details and try again.');

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_KEY!,
    { expiresIn: '1d' }
  );

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      role: user.role,
    },
  });
};