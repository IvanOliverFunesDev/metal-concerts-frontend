import { Concert } from "./concert";

export interface Band {
    id: string;
    bandName: string;
    image?: string
    genre: string;
    description: string;
    subscribersCount: number;
    averageRating: number;
    totalReviews: number;
}
export interface BandBasic {
    id: string;
    bandName: string;
    genre: string;
    image?: string;
}
export interface BandPublic extends Band {
    upcomingConcerts: Concert[];
    pastConcerts: Concert[];
}

