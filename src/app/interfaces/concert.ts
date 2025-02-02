import { BandList } from "./band";

export interface Concert {
    id: string;
    title: string;
    image?: string;
    description: string;
    date: string;
    location: string;
    band: BandList;
}
export interface ConcertDetails {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image?: string;
    band: BandList;
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

