import {LinkedAccount} from "./LinkedAccountData.ts";

export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  profileStats: {
    totalGames: number;
    totalHoursPlayed: number;
  }
  createdAt: Date;
  updatedAt: Date; // Adicione outros campos conforme necessário
  linkedAccounts: LinkedAccount[]; // Supondo que você tenha um tipo LinkedAccount definido
};
