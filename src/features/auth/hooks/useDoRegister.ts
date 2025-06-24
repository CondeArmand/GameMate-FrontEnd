import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../services/authApi"; // Ajuste o caminho se necessário
import type { RegisterFormData } from "../types/RegisterFormData"; // Ajuste o caminho se necessário
import { User as FirebaseUser } from "firebase/auth"; // Para tipar o usuário retornado pela API

// O hook retorna uma função que aceita os dados do formulário e realiza o cadastro
type HookReturn = (
  registerFormData: RegisterFormData,
) => Promise<FirebaseUser | null>; // A função de cadastro é assíncrona

const useDoRegister = (): HookReturn => {
  // Estes estados são internos ao hook e à função que ele retorna.
  // Não são diretamente expostos ao componente que usa o hook com esta assinatura.
  const [_error, setError] = useState<string | null>(null); // Renomeado para _error para evitar confusão se fosse exposto
  const [_loading, setLoading] = useState<boolean>(false); // Renomeado para _loading
  const navigate = useNavigate();

  // Esta é a função que será retornada e usada pelo componente
  return async (
    registerFormData: RegisterFormData,
  ): Promise<FirebaseUser | null> => {
    setError(null);
    setLoading(true);
    console.log("Tentando registrar com:", registerFormData); // Log para depuração

    try {
      const firebaseUser = await authApi.registerUser(registerFormData);
      console.log("Firebase registration success:", firebaseUser); // Log para depuração
      // Após o cadastro bem-sucedido no Firebase, redireciona para a página de login
      // Na Fase 3, esta lógica mudará para chamar nosso backend primeiro.
      navigate("/login", { replace: true });
      return firebaseUser;
    } catch (err: any) {
      // Usando 'any' para capturar qualquer tipo de erro do Firebase
      console.error("Firebase registration error:", err); // Log do erro completo
      // Você pode querer inspecionar err.code para mensagens mais específicas
      if (err.code === "auth/email-already-in-use") {
        setError("Este email já está em uso.");
      } else {
        setError(
          "Falha ao tentar registrar. Verifique os dados e tente novamente.",
        );
      }
      // Como não estamos expondo 'error' diretamente, o componente que chama
      // precisaria de outra forma de saber do erro, ou podemos modificar o retorno no futuro.
      return null;
    } finally {
      setLoading(false);
    }
  };
};

export default useDoRegister;
