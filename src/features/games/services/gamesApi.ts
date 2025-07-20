import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const resolveGameId = async (params: { igdbId?: string; steamAppId?: string }) => {
  try {
    const response = await axios.get(`${API_URL}/games/resolve`, { params });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao resolver ID do jogo:", error.response?.data || error.message);
    throw error.response?.data ?? new Error("Não foi possível resolver o ID do jogo.");
  }
};
const searchGames = async (query: string) => {
  if (!query.trim()) {
    return [];
  }
  try {
    const response = await axios.get(`${API_URL}/games/search`, {
      params: {
        q: query,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar jogos:", error.response?.data || error.message);
    throw error.response?.data ?? new Error("Não foi possível realizar a busca.");
  }
};

const getFeaturedGames = async () => {
  const response = await axios.get(`${API_URL}/games/featured`);
  return response.data;
};

const getGameDetails = async (gameId: string, idToken?: string | null) => {
  const config = idToken ? { headers: { Authorization: `Bearer ${idToken}` } } : {};
  try {
    const response = await axios.get(`${API_URL}/games/${gameId}`, config);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar detalhes do jogo:", error.response?.data || error.message);
    throw error.response?.data ?? new Error("Não foi possível buscar os detalhes do jogo.");
  }
};

const gamesApi = {
  resolveGameId,
  getFeaturedGames,
  searchGames,
  getGameDetails,
};

export default gamesApi;
