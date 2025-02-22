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
export interface BandPublic extends Band {
    upcomingConcerts: Concert[];
    pastConcerts: Concert[];
}

export interface SubscribedBand {
    _id: string;
    bandName: string;
    genre: string;
}