import CustomAPIError from './customAPIError';
import { StatusCodes } from 'http-status-codes';

class UnAuthenticatedError extends CustomAPIError {
  constructor(message: string = 'Bad Request') {
    super(message, StatusCodes.BAD_REQUEST);

    // Explicitly set the prototype for ES5 targets
    Object.setPrototypeOf(this, UnAuthenticatedError.prototype);
  }
}

export default UnAuthenticatedError;
