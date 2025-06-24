import axios from "axios";

const API_URL = "http://localhost:3000";

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

const gamesApi = {
  getFeaturedGames,
  searchGames,
};

export default gamesApi;
