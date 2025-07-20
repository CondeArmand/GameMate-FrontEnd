import { Box, CircularProgress, Container, Alert, Select, MenuItem, Button, SelectChangeEvent, Typography } from '@mui/material';
import useGameDetails from '../features/games/hooks/useGameDetails';
import usersApi from '../features/users/services/usersApi';
import { useAuthStore } from '../features/auth/states/authStore';
import { GameStatus } from '../features/users/types/GameStatus';

export default function GameDetailsPage() {
    const { game, loading, error, refetch, setGameData } = useGameDetails();
    const { idToken, currentUser } = useAuthStore();

    const handleAddGame = async () => {
        if (!game || !idToken) return;
        try {
            await usersApi.addGameToLibrary(idToken, game.id, 'GAMEMATE');
            refetch(); // Re-busca os dados para obter o estado de posse atualizado
        } catch (err) {
            console.error("Erro ao adicionar jogo:", err);
        }
    };

    const handleRemoveGame = async () => {
        if (!game || !idToken) return;
        try {
            await usersApi.removeGameFromLibrary(idToken, game.id);
            refetch();
        } catch (err) {
            console.error("Erro ao remover jogo:", err);
        }
    };

    const handleStatusChange = async (event: SelectChangeEvent<unknown>) => {
        if (!game || !idToken) return;
        const newStatus = event.target.value as GameStatus;

        // Atualização otimista
        const oldGame = game;
        setGameData({ ...game, ownership: { ...game.ownership, status: newStatus } });

        try {
            await usersApi.updateGameStatus(idToken, game.id, newStatus);
        } catch (err) {
            // Reverte em caso de erro
            setGameData(oldGame);
            console.error("Erro ao atualizar status:", err);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!game) {
        return <Alert severity="info">Jogo não encontrado.</Alert>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" gutterBottom>{game.name}</Typography>
            {/* Aqui viria o componente de visualização do jogo <GameDetailsView game={game} /> */}

            {currentUser && (
                <Box mt={3} p={2} border="1px solid grey" borderRadius={2}>
                    <Typography variant="h6">Minha Biblioteca</Typography>
                    {game.ownership.owned ? (
                        <Box display="flex" alignItems="center" gap={2} mt={1}>
                            <Select
                                value={game.ownership.status || ''}
                                onChange={handleStatusChange}
                                size="small"
                            >
                                {Object.values(GameStatus).map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                            </Select>
                            <Button variant="outlined" color="error" onClick={handleRemoveGame}>
                                Remover da Biblioteca
                            </Button>
                        </Box>
                    ) : (
                        <Button variant="contained" onClick={handleAddGame} sx={{ mt: 1 }}>
                            Adicionar à Biblioteca
                        </Button>
                    )}
                </Box>
            )}
        </Container>
    );
}