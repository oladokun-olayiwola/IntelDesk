import CustomAPIError from './customAPIError';
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends CustomAPIError {
  constructor(message: string = 'Bad Request') {
    super(message, StatusCodes.BAD_REQUEST);

    // Explicitly set the prototype for ES5 targets
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError;
