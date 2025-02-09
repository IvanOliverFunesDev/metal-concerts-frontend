export interface BandList {
    id: string;
    bandName: string;
    image?: string
    genre: string;
    description: string;
    subscribersCount: number;
    averageRating: number;
    totalReviews: number;
}

// export interface BandPopulate {
//     id: string;
//     bandName: string;
//     genre: string;
//     subscribersCount: number;
// }