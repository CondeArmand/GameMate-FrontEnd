export type IGDBGame = {
    id: number;
    name: string;
    summary: string;
    coverUrl: string;
    first_release_date: number;
    total_rating: number;
    genres: string[];
    platforms: string[];
    screenshots: string[];
}