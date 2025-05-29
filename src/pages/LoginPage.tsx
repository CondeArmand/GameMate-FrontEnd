import { useState } from 'react';
import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Impede o envio padrão do formulário
        console.log('Tentativa de login com:', { email, password });
        // Aqui, no futuro, chamaremos a função de login do Firebase
    };

    return (
        <Container component="main" maxWidth="xs"> {/* <-- Usa Container com tamanho 'xs' (extra small) */}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login GameMate
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <Stack spacing={2}> {/* <-- Usa Stack para espaçamento vertical */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Endereço de Email" // <-- Usa 'label'
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // <-- O onChange funciona da mesma forma
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained" // <-- Define a variante do botão (contained, outlined, text)
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}