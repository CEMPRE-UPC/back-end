import { Request } from 'express';
import User from '../models/user.model';

interface UserResponse {
    id: string;
    name: string;
    email: string;
    password: string;
    status: boolean;
    role: {
      id: number;
      role: string;
    }
  }
export interface CustomRequest extends Request {
    user: UserResponse;
    roleId: number
}