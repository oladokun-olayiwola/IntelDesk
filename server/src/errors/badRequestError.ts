import customAPIError from './customAPIError';
import {StatusCodes} from 'http-status-codes'

class badRequestError extends customAPIError {
  statusCode
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default badRequestError