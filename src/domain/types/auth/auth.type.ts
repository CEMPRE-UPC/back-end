import { Role } from '..';

export type UserToken = {
    user: {
        id: number;
        email: string;
        isActive: boolean;
        name?: string;
        role?: Role
    },
    token?: string;
}

export type SignToken = (payload: Object, duration?: string) => Promise<string | null>;
export type VerifyToken = <T>(token: string) => Promise<T | null>;
export type SendVerificationEmail = (email: string, token: string) => Promise<void>
