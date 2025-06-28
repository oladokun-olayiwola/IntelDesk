import { Schema, model, Document } from 'mongoose';

interface Surety {
  fullName: string;
  address: string;
  phoneNumber: string;
}

export interface CriminalRecordInterface extends Document {
  name: string;
  alias?: string;
  description: string;
  caseID: string;
  crimes: string[];
  chargedToCourt: boolean;
  bailed: boolean;
  surety?: Surety;
  gender?: string;
  status?: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SuretySchema = new Schema({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const CriminalRecordSchema = new Schema<CriminalRecordInterface>(
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
    surety: { type: SuretySchema },
    gender: { type: String, enum: ["male", "female",], default: "male" },
    status: {
      type: String,
      enum: ["under_investigation", "detained", "bailed", "charged", "released", "dismissed"],
      default: "under_investigation",
    },
    photo: { type: String },
  },
  {
    timestamps: true,
  }
);

export const CriminalRecord = model<CriminalRecordInterface>(
  'CriminalRecord',
  CriminalRecordSchema
);
