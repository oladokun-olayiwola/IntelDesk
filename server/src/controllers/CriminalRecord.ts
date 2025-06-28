import { Request, Response } from 'express';
import { CriminalRecord } from '../models/CriminalRecord';
import fs from 'fs';
import badRequestError from '../errors/badRequestError';
import notFoundError from '../errors/notFoundError';

const parseBoolean = (value: any) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true';
  return false;
};

export const createRecord = async (req: Request, res: Response) => {
  const photo = req.file?.path;

  try {
    const {
      name,
      alias,
      description,
      crimes,
      caseID,
      chargedToCourt,
      bailed: bailedRaw,
      status,
      gender,
    } = req.body;

    const bailed = parseBoolean(bailedRaw);

    if (!caseID) {
      if (photo) fs.unlinkSync(photo);
      throw new badRequestError("caseID is required");
    }

    const crimesList = typeof crimes === 'string' ? JSON.parse(crimes) : [];

    let surety;
    if (bailed) {
      const fullName = req.body['surety.fullName'];
      const address = req.body['surety.address'];
      const phoneNumber = req.body['surety.phoneNumber'];

      if (!fullName || !address || !phoneNumber) {
        if (photo) fs.unlinkSync(photo);
        throw new badRequestError("Surety information is required when bailed is true");
      }

      surety = { fullName, address, phoneNumber };
    }

    const newRecord = await CriminalRecord.create({
      name,
      alias,
      description,
      crimes: crimesList,
      caseID,
      chargedToCourt: parseBoolean(chargedToCourt),
      bailed,
      status,
      gender,
      surety: bailed ? surety : undefined,
      photo: photo || undefined,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    if (photo) fs.unlinkSync(photo);
    console.error(error);
    res.status(500).json({ message: 'Failed to create record', error });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const photo = req.file?.path;

  try {
    const {
      name,
      alias,
      description,
      crimes,
      chargedToCourt,
      bailed: bailedRaw,
      status,
      gender,
    } = req.body;

    const bailed = parseBoolean(bailedRaw);

    if (req.body.caseID) {
      if (photo) fs.unlinkSync(photo);
      throw new badRequestError("caseID cannot be modified");
    }

    const crimesList = typeof crimes === 'string' ? JSON.parse(crimes) : [];

    const oldRecord = await CriminalRecord.findById(req.params.id);
    if (!oldRecord) {
      if (photo) fs.unlinkSync(photo);
      throw new notFoundError("Record not found");
    }

    let surety;
    if (bailed) {
      const fullName = req.body['surety.fullName'];
      const address = req.body['surety.address'];
      const phoneNumber = req.body['surety.phoneNumber'];

      if (!fullName || !address || !phoneNumber) {
        if (photo) fs.unlinkSync(photo);
        throw new badRequestError("Surety information is required when bailed is true");
      }

      surety = { fullName, address, phoneNumber };
    }

    const updatedRecord = await CriminalRecord.findByIdAndUpdate(
      req.params.id,
      {
        name,
        alias,
        description,
        crimes: crimesList,
        chargedToCourt: parseBoolean(chargedToCourt),
        bailed,
        status,
        gender,
        surety: bailed ? surety : undefined,
        photo: photo || undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      if (photo) fs.unlinkSync(photo);
      throw new notFoundError("Record not found after update");
    }

    if (photo && oldRecord.photo) {
      fs.unlink(oldRecord.photo, (err) => {
        if (err) console.error('Failed to delete old photo:', err);
      });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    if (photo) fs.unlinkSync(photo);
    console.error(error);
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
