import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../lib/firebase.ts";
import type { LoginFormData } from "../types/LoginFormData";
import { RegisterFormData } from "../types/RegisterFormData.ts";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

async function login(loginFormData: LoginFormData) {
  const { email, password } = loginFormData;

  const response = await signInWithEmailAndPassword(auth, email, password);

  return response;
}

async function registerUser(data: RegisterFormData): Promise<any> {
  const { email, password, username } = data;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const firebaseUser = userCredential.user;

  // 2. Opcional, mas recomendado: Atualiza o perfil no Firebase
  if (firebaseUser && username) {
    await updateProfile(firebaseUser, {
      displayName: username,
    });
  }

  // 3. Obtém o ID Token do usuário recém-criado
  const idToken = await firebaseUser.getIdToken();

  console.log(idToken);

  // 4. Envia o ID Token e username para o seu backend
  try {
    const backendResponse = await axios.post(`${API_URL}/auth/register`, {
      idToken: idToken,
      username: username, // Enviando o username também
    });

    console.log("Resposta do backend:", backendResponse.data);
    return backendResponse.data;
  } catch (error: any) {
    console.error(
      "Erro ao chamar o backend para registrar:",
      error.response?.data || error.message,
    );
    throw (
      error.response?.data || new Error("Falha de comunicação com o servidor.")
    );
  }
}

const authApi = {
  login,
  registerUser,
};

export default authApi;
