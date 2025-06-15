// src/controllers/criminalRecord.ts
import { Request, Response } from 'express';
import { CriminalRecord } from '../models/CriminalRecord';
import { CriminalRecordInput } from '../types/criminalRecord';
import notFoundError from '../errors/notFoundError';

// Create
export const createRecord = async (req: Request, res: Response) => {
  try {
    const recordData: CriminalRecordInput = req.body;
    const newRecord = await CriminalRecord.create(recordData);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create record', error });
  }
};

// Read All
export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await CriminalRecord.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch records', error });
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

// Update
export const updateRecord = async (req: Request, res: Response) => {
  try {
    const updatedRecord = await CriminalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecord) {
      throw new notFoundError("Record not found")
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update record', error });
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