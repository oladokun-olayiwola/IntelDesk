// src/types/express.d.ts
import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      headers: {
        'x-user-id'?: string;
        'x-user-role'?: string;
      } & { [key: string]: string | string[] | undefined };
    }
  }
}