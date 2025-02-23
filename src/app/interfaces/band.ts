import { Concert } from "./concert";

export interface BandBase {
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

export interface Band extends BandBase { }
export interface BandPublic extends BandBase {
    upcomingConcerts: Concert[];
    pastConcerts: Concert[];
}

