import { User } from "./user";

export interface Band {
    _id: string;
    bandName: string;
    email: string;
    description: string;
    genre: string;
    image?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    subscribers: User[];
    status: 'pending' | 'approved' | 'reject';
    averageRating?: number;
    totalReviews?: number;
}