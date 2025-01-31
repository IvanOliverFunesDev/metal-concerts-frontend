import { Band } from "./band";
import { Concert } from "./concert";

export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
    favoriteConcerts: Concert[];
    subscribedBands: Band[];
}
