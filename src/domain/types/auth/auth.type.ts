import { Role } from '..';

export type UserToken = {
    user: {
        id: number;
        email: string;
        isActive: boolean;
        role?: Role
    },
    token: string;
}

export type SignToken = (payload: Object, duration?: string) => Promise<string | null>;
export type VerifyToken = <T>(token: string) => Promise<T | null>;