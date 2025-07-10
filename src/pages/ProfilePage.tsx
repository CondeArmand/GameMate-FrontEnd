import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert, Divider, Button, Chip,
} from "@mui/material";
import useUserProfile from "../features/users/hooks/useUserProfile";
import MyGamesList from "../features/users/components/ui/MyGamesList.tsx";
import { useMemo } from "react"; // Ajuste o caminho
import SteamIcon from '@mui/icons-material/Cloud';
import { useAuthStore } from "../features/auth/states/authStore.ts";
import usersApi from "../features/users/services/usersApi.ts";
import {useConfirm} from "material-ui-confirm";


const API_URL = import.meta.env.VITE_API_URL;

export default function ProfilePage() {
  const { profile, loading, error } = useUserProfile();
  const { idToken } = useAuthStore();
  const confirm = useConfirm();

  // Memoiza o cálculo para verificar se a conta Steam está conectada
  const isSteamConnected = useMemo(() => {
    if (!profile?.linkedAccounts) return false;
    return profile.linkedAccounts.some(account => account.provider === 'STEAM');
  }, [profile]);

  const handleLinkSteam = () => {
    if (!idToken) {
      alert("Você precisa estar logado para conectar a Steam.");
      return;
    }
    // Abre um popup para o fluxo de autenticação, passando o token na URL
    const authUrl = `${API_URL}/auth/steam?token=${idToken}`;
    window.open(authUrl, '_blank', 'width=800,height=600');
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
            alert('Conta desvinculada com sucesso!');
            // Aqui, você precisaria recarregar os dados do perfil para a UI atualizar
            // Ex: chamar uma função de 'refetchProfile()' se ela existir no seu hook
            window.location.reload(); // Solução simples por agora
          } catch (error: any) {
            alert(`Erro: ${error.message}`);
          }
        })
        .catch(() => {
          // Usuário clicou em "Cancelar"
          console.log('Desvinculação cancelada.');
        });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
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
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Perfil
        </Typography>
        {profile ? (
          <Box mt={2}>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Nome de Usuário:</strong> {profile.name || "Não definido"}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Email:</strong> {profile.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Membro Desde:</strong>{" "}
              {new Date(profile.createdAt).toLocaleDateString("pt-BR")}
            </Typography>
          </Box>
        ) : (
          <Typography>Não foi possível carregar os dados do perfil.</Typography>
        )}
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Contas Conectadas
        </Typography>
        <Box mt={2}>
          {isSteamConnected ? (
              <Chip
                  icon={<SteamIcon />}
                  label="Conta Steam Conectada"
                  color="success"
                  variant="filled"
                  onDelete={handleUnlinkSteam} // <-- Usa a nova função
              />
          ) : (
              <Button
                  variant="contained"
                  onClick={handleLinkSteam} // <-- Usa a nova função
              >
                Ligar Conta Steam
              </Button>
          )}
          {/* No futuro, outros botões de conexão (GOG, etc.) podem vir aqui */}
        </Box>
      </Paper>

      <Divider sx={{ my: 4 }} />

      <MyGamesList />
    </Container>
  );
}
