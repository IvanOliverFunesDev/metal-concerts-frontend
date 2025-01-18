import { Band } from "./band";

export interface Concert {
    _id: string;
    title: string;
    description: string
    date: string;
    genre: string;
    image: string;
    band: Band;
}
