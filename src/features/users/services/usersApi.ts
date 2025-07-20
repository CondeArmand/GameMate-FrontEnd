import axios from "axios";
import {GameStatus} from "../types/GameStatus.ts";

const API_URL = import.meta.env.VITE_API_URL;
const buildAuthHeaders = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

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
const getOwnedGames = async (token: string, params: any) => {
  return axios.get(`${API_URL}/users/me/games`, { ...buildAuthHeaders(token), params });
};

const addGameToLibrary = async (token: string, gameId: string, sourceProvider: 'GAMEMATE' | 'STEAM') => {
  return axios.post(`${API_URL}/users/me/games`, { gameId, sourceProvider }, buildAuthHeaders(token));
};

const removeGameFromLibrary = async (token: string, gameId: string) => {
  return axios.delete(`${API_URL}/users/me/games/${gameId}`, buildAuthHeaders(token));
};

const updateGameStatus = async (token: string, gameId: string, status: GameStatus) => {
  return axios.put(`${API_URL}/users/me/games/${gameId}/status`, { status }, buildAuthHeaders(token));
};

const unlinkStoreAccount = async (token: string, provider: 'STEAM') => {
  return axios.delete(`${API_URL}/users/me/linked-accounts/${provider}`, buildAuthHeaders(token));
};

const resyncSteamAccount = async (token: string) => {
  return axios.post(`${API_URL}/users/me/linked-accounts/steam/sync`, {}, buildAuthHeaders(token));
};


const usersApi = {
    getUserProfile,
    getOwnedGames,
    addGameToLibrary,
    removeGameFromLibrary,
    updateGameStatus,
    unlinkStoreAccount,
    resyncSteamAccount,
};

export default usersApi;
