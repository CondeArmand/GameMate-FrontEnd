export type LinkedAccount = {
    provider: 'STEAM' | 'GOG';
    providerAccountId: string;
    username: string | null;
}