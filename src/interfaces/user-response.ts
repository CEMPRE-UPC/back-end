export interface UserResponse {
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