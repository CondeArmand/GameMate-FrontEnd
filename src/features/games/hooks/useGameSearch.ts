import { useState, useCallback } from 'react';
import gamesApi from '../services/gamesApi';
// Importe o tipo IGDBGame que já definimos antes
import { IGDBGame } from '../types/IGDBGameType.ts';

export default function useGameSearch() {
    const [results, setResults] = useState<IGDBGame[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const performSearch = useCallback(async (query: string) => {
        setLoading(true);
        setError(null);
        try {
            const searchResults = await gamesApi.searchGames(query);
            setResults(searchResults);
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro na busca.');
            setResults([]); // Limpa resultados anteriores em caso de erro
        } finally {
            setLoading(false);
        }
    }, []);

    return { results, loading, error, performSearch };
}