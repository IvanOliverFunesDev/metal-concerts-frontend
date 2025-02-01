import { Concert } from "./concert";

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