// src/middleware/validateCriminalRecord.ts
import { Request, Response, NextFunction } from 'express';
import { CriminalRecordInput } from '../types/criminalRecord';

export const validateCriminalRecord = (req: Request, res: Response, next: NextFunction) => {
  const { bailed, surety } = req.body as CriminalRecordInput;

  if (bailed) {
    if (!surety) {
      return res.status(400).json({ 
        message: 'Surety information is required when bailed is true' 
      });
    }

    const requiredFields = ['fullName', 'address', 'phoneNumber', 'relationship', 'idType', 'idNumber'];
    const missingFields = requiredFields.filter(field => !surety[field as keyof typeof surety]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'Missing required surety fields',
        missingFields
      });
    }
  }

  next();
};