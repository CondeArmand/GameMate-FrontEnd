import axios from "axios";

const API_URL = "https://gamemate-backend-dev.onrender.com"; // URL base do seu backend

/**
 * Busca o perfil do usuário logado no backend.
 * @param token O ID Token do Firebase para autenticação.
 * @returns Os dados do perfil do usuário.
 */
const getUserProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        // Envia o token no cabeçalho Authorization, como o backend espera
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao buscar perfil do usuário:",
      error.response?.data || error.message,
    );
    // Relança o erro para que o hook que o chamou possa tratá-lo
    throw (
      error.response?.data ||
      new Error("Não foi possível buscar os dados do perfil.")
    );
  }
};

/**
 * Busca a lista de jogos que o usuário possui e que foram sincronizados.
 * @param token O ID Token do Firebase para autenticação.
 * @returns A lista de jogos do usuário.
 */
const getOwnedGames = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/me/games`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar jogos do usuário:", error.response?.data || error.message);
    throw error.response?.data || new Error("Não foi possível buscar a lista de jogos.");
  }
};

const unlinkStoreAccount = async (token: string, provider: 'STEAM' | 'GOG') => {
  try {
    // Note o uso do método `delete` do axios
    await axios.delete(`${API_URL}/users/me/linked-accounts/${provider}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error(`Erro ao desvincular conta ${provider}:`, error.response?.data || error.message);
    throw error.response?.data || new Error(`Não foi possível desvincular a conta ${provider}.`);
  }
};

const usersApi = {
  getUserProfile,
  getOwnedGames,
  unlinkStoreAccount,
};

export default usersApi;
