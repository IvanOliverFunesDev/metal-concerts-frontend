export interface User {
    id: string;
    role: string;
    status: string;
    username: string;
    email: string;
    createdAt: Date;
    token?: string;
}
export interface ProfileUser {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserReview {
    _id: string;
    username: string;
}