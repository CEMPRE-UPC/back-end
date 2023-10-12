import { Request } from 'express';
import { User, Role } from '../models';


export interface CustomRequest extends Request {
    user: User;
    role: Role;
}