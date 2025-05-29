import {Container, Typography} from "@mui/material";

export default function HomePage() {
    return (
        <Container maxWidth="md" sx={{mt: 4}} >
            <Typography variant="h3" component="h1" gutterBottom>
                Bem-vindo ao GameMate!
            </Typography>
            <Typography variant="h6" component="p">
                Sua plataforma para encontrar parceiros de jogo.
            </Typography>
        </Container>
    );
}