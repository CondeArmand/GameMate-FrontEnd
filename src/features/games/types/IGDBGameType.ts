export type IGDBGame = {
    id: number;
    name: string;
    summary: string;
    cover: IGDBImage;
    first_release_date: number;
    total_rating: number;
    genres: IGDBGenre[];
    platforms: IGDBPlatform[];
    screenshots: IGDBImage[];
}