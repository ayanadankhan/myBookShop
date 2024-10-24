import { User } from './auth/user.interface';  // Import your User interface

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Extend the Request type to include the 'user' of type 'User'
    }
  }
}
