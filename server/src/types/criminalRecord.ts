export interface Surety {
  fullName: string;
  address: string;
  phoneNumber: string;
  relationship: string;
  idType?: 'national' | 'passport' | 'driver';
  idNumber?: string;
}

export interface CriminalRecordInput {
  name: string;
  alias?: string;
  description: string;
  crimes: string[];
  chargedToCourt?: boolean;
  bailed?: boolean;
  surety?: Surety;
}

export interface CriminalRecordDocument extends CriminalRecordInput {
  createdAt: Date;
  updatedAt: Date;
}