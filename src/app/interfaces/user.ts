import { Concert } from "./concert";

export interface User {
    _id: string,
    name: string
    email: string,
    password: string,
    createdAt: Date;
    updatedAt: Date;
    favoriteConcerts: Concert[];
}
