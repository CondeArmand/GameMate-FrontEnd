import { useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useAuthStore } from "../states/authStore"; // <-- Importa o store do Zustand
import type { CurrentUser } from "../types/CurrentUser";

export default function useAuthObserver() {
  const setAuthState = useAuthStore((state) => state.setAuthState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          try {
            const token = await firebaseUser.getIdToken();
            const userData: CurrentUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            };
            setAuthState({
              currentUser: userData,
              idToken: token,
              loading: false,
              error: null,
            });
          } catch (error: any) {
            setAuthState({
              currentUser: null,
              idToken: null,
              loading: false,
              error: error,
            });
          }
        } else {
          setAuthState({
            currentUser: null,
            idToken: null,
            loading: false,
            error: null,
          });
        }
      },
    );

    return () => unsubscribe();
  }, [setAuthState]);
}
