import { useNavigate } from "react-router-dom";
import authApi from "../services/authApi";
import type { LoginFormData } from "../types/LoginFormData";
import { useAuthStore } from "../states/authStore"; // <-- 1. Importa o store do Zustand

// A assinatura do retorno do hook permanece a mesma
type HookReturn = (loginFormData: LoginFormData) => Promise<void>;

export default function useDoLogin(): HookReturn {
  // 2. Pega a ação para atualizar o estado global do nosso store
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const navigate = useNavigate();

  // 3. A função retornada agora atualiza o estado global
  return async (loginFormData: LoginFormData): Promise<void> => {
    // Define o estado global como "carregando" e limpa erros anteriores
    setAuthState({ loading: true, error: null });

    try {
      await authApi.login(loginFormData);

      // O sucesso é tratado pelo useAuthObserver, que irá atualizar o currentUser e o idToken.
      // O useAuthObserver também definirá loading como false.
      // Apenas navegamos.
      navigate("/", { replace: true });
    } catch (err: any) {
      console.error("Falha no login:", err);
      const error = new Error("Falha no login: Verifique seu email e senha.");

      // Em caso de erro, atualiza o estado global com a mensagem de erro e para o loading.
      setAuthState({ error, loading: false });
    }
  };
}
