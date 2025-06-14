import { Error } from "mongoose";

class customAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default customAPIError