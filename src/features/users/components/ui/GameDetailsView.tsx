import {Box, Button, Card, CardContent, CardMedia, Chip, Container, Grid, Typography} from '@mui/material';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {GameDetails} from "../../../games/types/GameOwnership.ts";

interface GameDetailsViewProps {
    game: GameDetails;
    isUserLoggedIn: boolean;
    onAddGame: () => void;
    isAdding: boolean;
}

export default function GameDetailsView({ game, isUserLoggedIn, onAddGame, isAdding }: GameDetailsViewProps) {
    const renderOwnershipStatus = () => {
        if (!isUserLoggedIn) {
            return null; // Não mostra nada se o usuário não estiver logado
        }

        if (game.ownership) {
            return (
                <Chip
                    icon={<LibraryAddCheckIcon />}
                    label="Na Biblioteca"
                    color="success"
                    sx={{ mb: 2 }}
                />
            );
        }

        return (
            <Button
                variant="contained"
                color="primary"
                startIcon={<LibraryAddIcon />}
                onClick={onAddGame}
                disabled={isAdding}
                sx={{ mb: 2 }}
            >
                {isAdding ? 'Adicionando...' : 'Adicionar à Biblioteca'}
            </Button>
        );
    };



    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card>
                <Grid container>
                    <Grid item sm={4}>
                        <CardMedia
                            component="img"
                            image={game.coverUrl || 'https://via.placeholder.com/300x400'}
                            alt={game.name}
                            sx={{ width: '100%', height: 'auto' }}
                        />
                    </Grid>
                    <Grid item sm={8}>
                        <CardContent>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {game.name}
                            </Typography>
                            {renderOwnershipStatus()}
                            <Typography variant="body1" color="text.secondary" paragraph>
                                {game.summary}
                            </Typography>
                            {game.rating && (
                                <Typography variant="h6">
                                    Nota: {game.rating.toFixed(1)}/100
                                </Typography>
                            )}
                            {game.releaseDate && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Lançamento:</strong> {new Date(game.releaseDate).toLocaleDateString('pt-BR')}
                                </Typography>
                            )}
                            {game.playtimeMinutes !== undefined && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Tempo de Jogo:</strong> {Math.round(game.playtimeMinutes / 60)} horas
                                </Typography>
                            )}
                            {game.lastPlayedAt && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Última vez jogado:</strong> {new Date(game.lastPlayedAt).toLocaleDateString('pt-BR')}
                                </Typography>
                            )}
                            <Box sx={{ mt: 2 }}>
                                {game.genres?.map((genre) => <Chip key={genre} label={genre} sx={{ mr: 1, mb: 1 }} />)}
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                {game.platforms?.map((platform) => <Chip key={platform} label={platform} sx={{ mr: 1, mb: 1 }} variant="outlined" />)}
                            </Box>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}