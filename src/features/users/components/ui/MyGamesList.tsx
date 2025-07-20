import {
    Alert,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material';
import type {OwnedGame} from '../../hooks/useMyGames';
import useMyGames from '../../hooks/useMyGames'; // Ajuste o caminho
import {useNavigate} from "react-router-dom"; // Importa o tipo

export default function MyGamesList() {
    const {games, loading, error} = useMyGames();
    const navigate = useNavigate();

    const handleGameClick = async (game: OwnedGame) => {
        try {
            // Para jogos já possuídos, o ID do nosso sistema já é o UUID
            // Portanto, podemos navegar diretamente.
            navigate(`/game/${game.id}`);
        } catch (err) {
            console.error("Falha ao navegar para detalhes do jogo:", err);
        }
    };

    if (loading) {
        return <CircularProgress sx={{mt: 4}}/>;
    }

    if (error) {
        return <Alert severity="error" sx={{mt: 4}}>{error}</Alert>;
    }

    if (games.length === 0) {
        return (
            <Typography sx={{mt: 4, color: 'text.secondary'}}>
                Você ainda não tem jogos sincronizados. Conecte sua conta Steam!
            </Typography>
        );
    }

    return (
        <Box sx={{mt: 4}}>
            <Typography variant="h5" component="h2" gutterBottom>
                Meus Jogos
            </Typography>
            <Grid container spacing={2}>
                {games.map((game: OwnedGame) => (
                    <Grid item xs={6} sm={4} md={3} key={game.id}>
                        <Card>
                            <CardActionArea onClick={() => handleGameClick(game)}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={game.coverUrl || 'https://via.placeholder.com/150x200'}
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
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}