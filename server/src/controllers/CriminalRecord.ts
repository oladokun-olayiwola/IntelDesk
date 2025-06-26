// src/controllers/criminalRecord.ts
import { Request, Response } from 'express';
import { CriminalRecord } from '../models/CriminalRecord';
import notFoundError from '../errors/notFoundError';
import badRequestError from '../errors/badRequestError';

export const createRecord = async (req: Request, res: Response) => {
  try {
    const { bailed, surety, caseID, ...recordData } = req.body;

    if (!caseID) {
      throw new badRequestError("caseID is required");
    }

    if (bailed && !surety) {
      throw new badRequestError("Surety information is required when bailed is true");
    }

    const newRecord = await CriminalRecord.create({
      ...recordData,
      caseID,
      bailed,
      surety: bailed ? surety : undefined,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create record', error });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  try {
    const { bailed, surety, caseID, ...updateData } = req.body;

    // Block caseID updates (if needed)
    if (caseID) {
      throw new badRequestError("caseID cannot be modified");
    }

    // Validate surety if bailed
    if (bailed && !surety) {
      const existingRecord = await CriminalRecord.findById(req.params.id);
      if (existingRecord?.bailed && !surety) {
        throw new badRequestError("Cannot remove surety from a bailed record");
      }
    }

    const updatedRecord = await CriminalRecord.findByIdAndUpdate(
      req.params.id,
      {
        ...updateData,
        bailed,
        surety: bailed ? surety : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      throw new notFoundError("Record not found");
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update record', error });
  }
};

export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await CriminalRecord.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch records', error });
  }
};

// Delete
export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const deletedRecord = await CriminalRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      throw new notFoundError("Record not found")
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete record', error });
  }
};

// Read One
export const getRecordById = async (req: Request, res: Response) => {
  try {
    const record = await CriminalRecord.findById(req.params.id);
    if (!record) {
      throw new notFoundError("Record not found")
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch record', error });
  }
};
