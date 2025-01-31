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
}
