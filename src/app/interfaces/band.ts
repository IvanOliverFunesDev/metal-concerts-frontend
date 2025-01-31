import { User } from "./user";
export interface Band {
    _id: string;
    name: string;
    email: string,
    password: string,
    description: string;
    genre: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    subscribers: User[];
}
