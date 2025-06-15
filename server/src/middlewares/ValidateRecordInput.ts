// src/middleware/validateRecord.ts
import { Request, Response, NextFunction } from 'express';
import { CriminalRecordInput } from '../types/criminalRecord';

export const validateRecordInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, crimes, shortee } = req.body as CriminalRecordInput;

  if (!name || !description || !crimes || !shortee) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!Array.isArray(crimes)) {
    return res.status(400).json({ message: 'Crimes must be an array' });
  }

  if (!shortee.fullName || !shortee.address || !shortee.phoneNumber) {
    return res.status(400).json({ message: 'Shortee information incomplete' });
  }

  next();
};