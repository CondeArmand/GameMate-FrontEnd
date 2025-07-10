import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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

const getGameDetailsById = async (gameId: string, idToken?: string | null): Promise<any> => {
  const config = {
    headers: {},
  };

  // Se um token for fornecido, o anexa ao cabeçalho de autorização.
  // Isso permite que o backend retorne dados personalizados para o usuário logado.
  if (idToken) {
    config.headers = {
      Authorization: `Bearer ${idToken}`,
    };
  }

  const response = await axios.get(`${API_URL}/games/${gameId}`, config);
  return response.data;
};

const gamesApi = {
  getFeaturedGames,
  searchGames,
  getGameDetailsById,
};

export default gamesApi;
