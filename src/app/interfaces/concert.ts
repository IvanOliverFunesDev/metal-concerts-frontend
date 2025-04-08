import { BandBasic } from "./band";


export interface BaseConcert {
    id: string;
    title: string;
    date: Date;
    image?: string;
    isFavorite?: boolean;
}

export interface Concert extends BaseConcert {
    description: string;
    location: string;
    band: BandBasic;
}

export interface RelatedConcert extends Concert { }
export interface FavoriteConcert extends Concert { }
export interface ConcertDetails extends Concert {
    averageRating: number;
    relatedConcerts: RelatedConcert[];
    concertsOfSameBand: ConcertsOfSameBand[];
}
export interface ConcertsOfSameBand extends BaseConcert { }



// export interface Concert {
//     id: string;
//     title: string;
//     image?: string;
//     description: string;
//     date: Date;
//     location: string;
//     band: BandBasic;
//     isFavorite?: boolean;
// }

// export interface RelatedConcert extends Concert { }
// export interface FavoriteConcert extends Concert { }
// export interface ConcertDetails extends Concert {
//     averageRating: number;
//     relatedConcerts: RelatedConcert[];
//     concertsOfSameBand: ConcertsOfSameBand[];
// }
// export interface ConcertsOfSameBand {
//     id: string;
//     title: string;
//     date: Date;
//     image: string;
// }

