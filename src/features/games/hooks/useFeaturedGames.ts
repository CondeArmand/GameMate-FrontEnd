import { useState, useEffect } from "react";
import gamesApi from "../services/gamesApi";

export default function useFeaturedGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const featuredGames = await gamesApi.getFeaturedGames();
        setGames(featuredGames);
      } catch (err) {
        setError("Não foi possível carregar os jogos de destaque.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []); // Roda apenas uma vez na montagem do componente

  return { games, loading, error };
}
