import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Grid,
    Card,
    CardMedia,
    CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useGameSearch from '../features/games/hooks/useGameSearch';

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { results, loading, error, performSearch } = useGameSearch();

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        performSearch(searchTerm);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" sx={{ my: 4 }}>
                Buscar Jogos
            </Typography>

            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 1, mb: 4 }}>
                <TextField
                    fullWidth
                    label="Digite o nome de um jogo..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={<SearchIcon />}
                >
                    {loading ? 'Buscando...' : 'Buscar'}
                </Button>
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            {!loading && results.length > 0 && (
                <Grid container spacing={2}>
                    {results.map((game: any) => (
                        <Grid item xs={6} sm={4} md={3} lg={2.4} key={game.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={game.cover?.url || 'https://via.placeholder.com/180x250'}
                                    alt={game.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ height: 80 }}>
                                    <Typography gutterBottom variant="subtitle2" component="div" noWrap title={game.name}>
                                        {game.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {!loading && !error && results.length === 0 && (
                <Typography sx={{ color: 'text.secondary' }}>
                    Nenhum resultado encontrado. Tente uma nova busca.
                </Typography>
            )}
        </Container>
    );
}