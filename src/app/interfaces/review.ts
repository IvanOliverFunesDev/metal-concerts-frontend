import { UserReview } from "./user";

export interface Review {
    _id: string;
    user: UserReview;
    rating: number;
    comment: string;
    createdAt: Date;
}


