import { User } from "./types";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Replace `any` with your specific `User` type
    }
  }
}

// Ensure this file is treated as a module
export { };
