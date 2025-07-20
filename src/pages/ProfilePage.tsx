import {
  Container, Typography, Paper, Box, CircularProgress, Alert, Divider, Button, Chip, IconButton, Snackbar
} from "@mui/material";
import useUserProfile from "../features/users/hooks/useUserProfile";
import MyGamesList from "../features/users/components/ui/MyGamesList.tsx";
import { useMemo, useState } from "react";
import SteamIcon from '@mui/icons-material/Cloud';
import SyncIcon from '@mui/icons-material/Sync';
import { useAuthStore } from "../features/auth/states/authStore.ts";
import usersApi from "../features/users/services/usersApi.ts";
import { useConfirm } from "material-ui-confirm";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfilePage() {
  const { profile, loading, error } = useUserProfile();
  const { idToken } = useAuthStore();
  const confirm = useConfirm();
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const isSteamConnected = useMemo(() => {
    if (!profile?.linkedAccounts) return false;
    return profile.linkedAccounts.some(account => account.provider === 'STEAM');
  }, [profile]);

  const handleLinkSteam = () => {
    if (!idToken) {
      setNotification({ message: "Você precisa estar logado para conectar a Steam.", severity: 'error' });
      return;
    }
    // Redirecionamento para o backend iniciar o fluxo OAuth
    const authUrl = `${API_URL}/auth/steam/initiate?token=${idToken}`;
    window.location.href = authUrl;
  };

  const handleUnlinkSteam = () => {
    confirm({
      title: 'Desvincular Conta Steam?',
      description: 'Esta ação irá remover a ligação com a sua conta Steam e apagar os jogos sincronizados. Esta ação não pode ser desfeita.',
      confirmationText: 'Sim, desvincular',
      cancellationText: 'Cancelar',
    }).then(async () => {
      if (!idToken) return;
      try {
        await usersApi.unlinkStoreAccount(idToken, 'STEAM');
        setNotification({ message: 'Conta desvinculada com sucesso!', severity: 'success' });
        window.location.reload();
      } catch (error: any) {
        setNotification({ message: `Erro: ${error.message}`, severity: 'error' });
      }
    }).catch(() => console.log('Desvinculação cancelada.'));
  };

  const handleResync = async () => {
    if (!idToken) return;
    setIsSyncing(true);
    setNotification(null);
    try {
      await usersApi.resyncSteamAccount(idToken);
      setNotification({ message: 'Sincronização concluída! Seus jogos foram atualizados.', severity: 'success' });
      // Opcional: Recarregar a lista de jogos sem dar reload na página inteira
    } catch (error: any) {
      setNotification({ message: `Erro na sincronização: ${error.message}`, severity: 'error' });
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
    );
  }

  if (error) {
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
    );
  }

  return (
      <Container maxWidth="md">
        {/* ... (código do perfil do usuário) ... */}

        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Contas Conectadas
          </Typography>
          <Box mt={2} display="flex" alignItems="center" gap={2}>
            {isSteamConnected ? (
                <>
                  <Chip
                      icon={<SteamIcon />}
                      label="Conta Steam Conectada"
                      color="success"
                      onDelete={handleUnlinkSteam}
                  />
                  <IconButton onClick={handleResync} disabled={isSyncing} aria-label="Atualizar Jogos">
                    {isSyncing ? <CircularProgress size={24} /> : <SyncIcon />}
                  </IconButton>
                </>
            ) : (
                <Button variant="contained" onClick={handleLinkSteam} startIcon={<SteamIcon />}>
                  Ligar Conta Steam
                </Button>
            )}
          </Box>
        </Paper>

        <Divider sx={{ my: 4 }} />

        {/* A lista de jogos agora será atualizada para incluir filtros e paginação */}
        <MyGamesList />

        <Snackbar
            open={!!notification}
            autoHideDuration={6000}
            onClose={() => setNotification(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setNotification(null)} severity={notification?.severity} sx={{ width: '100%' }}>
            {notification?.message}
          </Alert>
        </Snackbar>
      </Container>
  );
}