import {LinkedAccount} from "./LinkedAccountData.ts";

export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date; // Adicione outros campos conforme necessário
  linkedAccounts: LinkedAccount[]; // Supondo que você tenha um tipo LinkedAccount definido
};
