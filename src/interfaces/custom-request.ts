import { Request } from 'express';
import { UserResponse } from './user-response';
import { RoleResponse } from './role-response';


export interface CustomRequest extends Request {
    user: UserResponse;
    role: RoleResponse;
}