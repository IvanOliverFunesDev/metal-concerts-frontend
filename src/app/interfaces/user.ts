export interface User {
    id: string;
    role: string;
    status: string;
    username: string;
    email: string;
    createdAt: Date;
}
export interface ProfileUser {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
