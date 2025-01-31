import { Band } from "./band";

export interface Concert {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image?: string;
    band: Band;
    averageRating?: number;
    relatedConcerts?: RelatedConcert[]; // Campo opcional porque solo aparece en getConcertById
}

export interface RelatedConcert {
    id: string;
    title: string;
    date: string;
    image?: string
    location: string;
    band: {
        bandId: string;
        bandName: string;
        genre: string;
        image?: string;
    };
}