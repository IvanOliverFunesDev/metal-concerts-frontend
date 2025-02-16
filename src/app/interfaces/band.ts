import { Concert } from "./concert";
export interface BandList {
    id: string;
    bandName: string;
    image?: string
    genre: string;
    description: string;
    subscribersCount: number;
    averageRating: number;
    totalReviews: number;
}
export interface BandPublic {
    id: string;
    bandName: string;
    image?: string;
    genre: string;
    description: string;
    subscribersCount: number;
    upcomingConcerts: Concert[];
    averageRating: number;
    totalReviews: number;
    pastConcerts: Concert[];
}