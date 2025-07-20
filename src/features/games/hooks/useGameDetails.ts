import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../auth/states/authStore';
import gamesApi from '../services/gamesApi';
import {GameDetails} from "../types/GameOwnership.ts";

export default function useGameDetails() {
    const { gameId } = useParams<{ gameId: string }>();
    const { idToken } = useAuthStore();

    const [game, setGame] = useState<GameDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGameDetails = async () => {
        if (!gameId) {
            setError("ID do jogo não encontrado na URL.");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const details = await gamesApi.getGameDetails(gameId, idToken);
            setGame(details);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar os detalhes do jogo.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGameDetails();
    }, [gameId, idToken]);

    // Função para permitir que a página atualize o estado localmente (e.g., status do jogo)
    const setGameData = (newGameData: GameDetails) => {
        setGame(newGameData);
    };

    return { game, loading, error, refetch: fetchGameDetails, setGameData };
}