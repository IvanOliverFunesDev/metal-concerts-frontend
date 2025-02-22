import { Band } from "./band";

export interface Concert {
    id: string;
    title: string;
    image?: string;
    description: string;
    date: string;
    location: string;
    band: Band;
}
export interface ConcertDetails extends Concert {
    averageRating: number;
    relatedConcerts: RelatedConcert[];
    concertsOfSameBand: ConcertsOfSameBand[];
}

export interface ConcertsOfSameBand {
    id: string;
    title: string;
    date: Date;
    image: string;
}

export interface RelatedConcert {
    id: string;
    title: string;
    date: string;
    description: string;
    image?: string
    location: string;
    band: {
        bandId: string;
        bandName: string;
        genre: string;
        image?: string;
    };
}
export interface FavoriteConcert {
    _id: string;
    title: string;
    date: Date;
    location: string;
    band: string;
}