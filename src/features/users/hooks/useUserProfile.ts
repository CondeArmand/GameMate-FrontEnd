import { useState, useEffect } from "react"; // Ajuste o caminho
import usersApi from "../services/usersApi";
import { useAuthStore } from "../../auth/states/authStore";
import { UserProfile } from "../types/UserData";

export default function useUserProfile() {
  // Pega o estado de autenticação do Recoil
  const { idToken } = useAuthStore();

  // Estados locais para os dados do perfil, loading e erro
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!idToken) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const userProfileData = await usersApi.getUserProfile(idToken);
        setProfile(userProfileData);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar o perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [idToken]); // O hook roda novamente se o idToken mudar

  return { profile, loading, error };
}
