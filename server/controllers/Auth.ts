import { Request, RequestHandler, Response } from 'express';
import badRequestError from '../errors/badRequestError';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export const register: RequestHandler = async (req, res) => {
  const { email, username, password, role } = req.body;

  if (!email || !username || !password) {
    throw new badRequestError(
      'Username and Password are required for registration.'
    )};

  const userExists = await User.findOne({ email });
  if (userExists) throw new badRequestError('Email already in use.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    role,
  });
  res.status(200).json({
    message: 'User created Successfully.',
    error: false,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new badRequestError('Email and password are required.');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new badRequestError('Email or password is invalid.');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new badRequestError('Email or password is invalid.');

   const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      username: user.username,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '10h' }
  );

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  });
};
