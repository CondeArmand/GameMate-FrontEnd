import { useState, useEffect } from 'react';
import { useAuthStore } from '../../auth/states/authStore.ts'; // Ajuste o caminho
import usersApi from '../services/usersApi';

// Tipo para os jogos que recebemos do nosso backend
export interface OwnedGame {
    id: string;
    name: string;
    coverUrl: string | null;
    playtimeMinutes: number | null;
}

export default function useMyGames() {
    const { idToken } = useAuthStore();

    const [games, setGames] = useState<OwnedGame[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMyGames = async () => {
            if (!idToken) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const ownedGamesData = await usersApi.getOwnedGames(idToken, undefined);
                setGames(ownedGamesData.data.data);
            } catch (err: any) {
                setError(err.message || 'Erro ao carregar seus jogos.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyGames();
    }, [idToken]); // Roda sempre que o token mudar

    return { games, loading, error };
}