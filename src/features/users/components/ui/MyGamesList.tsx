import { Box, Typography, CircularProgress, Alert, Grid, Card, CardMedia, CardContent } from '@mui/material';
import useMyGames from '../../hooks/useMyGames'; // Ajuste o caminho
import type { OwnedGame } from '../../hooks/useMyGames'; // Importa o tipo

export default function MyGamesList() {
    const { games, loading, error } = useMyGames();

    if (loading) {
        return <CircularProgress sx={{ mt: 4 }} />;
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
    }

    if (games.length === 0) {
        return (
            <Typography sx={{ mt: 4, color: 'text.secondary' }}>
                Você ainda não tem jogos sincronizados. Conecte sua conta Steam!
            </Typography>
        );
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Meus Jogos
            </Typography>
            <Grid container spacing={2}>
                {games.map((game: OwnedGame) => (
                    <Grid item xs={6} sm={4} md={3} key={game.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={game.coverUrl || 'https://via.placeholder.com/150x200'} // Imagem placeholder
                                alt={game.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="subtitle1" component="div" noWrap>
                                    {game.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {Math.round((game.playtimeMinutes || 0) / 60)} horas jogadas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}