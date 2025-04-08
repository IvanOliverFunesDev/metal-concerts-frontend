import { Concert } from "./concert";
export interface BaseBand {
    id: string;
    bandName: string;
    image?: string;
    isSubscribed?: boolean;
}
export interface Band extends BaseBand {
    genre: string;
    description: string;
    subscribersCount: number;
    averageRating: number;
    totalReviews: number;
}
export interface VeryBasicBand extends BaseBand { }
export interface BandBasic extends BaseBand {
    genre: string;
}
export interface BandPublic extends Band {
    upcomingConcerts: Concert[];
    pastConcerts: Concert[];
}



// export interface Band {
//     id: string;
//     bandName: string;
//     image?: string
//     genre: string;
//     description: string;
//     subscribersCount: number;
//     averageRating: number;
//     totalReviews: number;
// }

// export interface VeryBasicBand {
//     id: string;
//     bandName: string;
//     image?: string;
// }
// export interface BandBasic {
//     id: string;
//     bandName: string;
//     genre: string;
//     image?: string;
// }


// export interface BandPublic extends Band {
//     upcomingConcerts: Concert[];
//     pastConcerts: Concert[];
// }

