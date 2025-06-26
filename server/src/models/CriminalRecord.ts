// src/models/CriminalRecord.ts
import { Schema, model, Document } from 'mongoose';

interface Surety {
  fullName: string;
  address: string;
  phoneNumber: string;
}

interface CriminalRecordInterface extends Document {
  name: string;
  alias?: string;
  description: string;
  caseID: string;
  crimes: string[];
  chargedToCourt: boolean;
  bailed: boolean;
  surety: Surety;
  createdAt: Date;
  updatedAt: Date;
}

const SuretySchema = new Schema({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const CriminalRecordSchema = new Schema(
  {
    name: { type: String, required: true },
    alias: { type: String },
    caseID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: { type: String, required: true },
    crimes: { type: [String], required: true },
    chargedToCourt: { type: Boolean, default: false },
    bailed: { type: Boolean, default: false },
    surety: { type: SuretySchema, required: true },
  },
  {
    timestamps: true,
  }
);

export const CriminalRecord = model<CriminalRecordInterface>(
  'CriminalRecord',
  CriminalRecordSchema
);
