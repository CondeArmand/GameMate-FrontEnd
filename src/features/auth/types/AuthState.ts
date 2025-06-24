import type { CurrentUser } from "./CurrentUser";

export type AuthState = {
  currentUser: CurrentUser | null;
  idToken: string | null;
  loading: boolean;
  error: Error | null;
};
