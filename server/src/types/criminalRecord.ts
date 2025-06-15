// src/types/criminalRecord.ts
export interface Shortee {
  fullName: string;
  address: string;
  phoneNumber: string;
}

export interface CriminalRecordInput {
  name: string;
  alias?: string;
  description: string;
  crimes: string[];
  chargedToCourt?: boolean;
  bailed?: boolean;
  shortee: Shortee;
}

export interface CriminalRecordDocument extends CriminalRecordInput {
  createdAt: Date;
  updatedAt: Date;
}