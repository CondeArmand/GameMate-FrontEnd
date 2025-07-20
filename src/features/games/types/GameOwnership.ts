import {GameStatus} from "../../users/types/GameStatus.ts";

export interface GameOwnership {
    owned: boolean;
    status?: GameStatus; // e.g., 'JOGANDO', 'ZERADO'
    playtimeMinutes?: number;
    lastPlayedAt?: string;
}

export interface GameDetails {
    id: string;
    name: string;
    summary?: string;
    coverUrl?: string;
    rating?: number;
    releaseDate?: string;
    genres?: string[];
    platforms?: string[];
    screenshots?: { id: number; url: string }[];
    developers?: string[];
    publishers?: string[];
    playtimeMinutes?: number;
    lastPlayedAt?: string;
    ownership: GameOwnership;
}